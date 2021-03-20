import { Request, Response } from 'express'
import * as table from '../models/accessLogsModel'
import { amsOptions } from '../../config'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

/**
 * 文字列を整数にパースする
 * 正の整数を示す入力以外が来た場合は null を返す
 */
function parsePositiveInteger (s: string | undefined): number | null {
  if (s) {
    const i = Number(s)
    if (Number.isInteger(i) && i > 0) {
      return i
    }
  }
  return null
}

const DEFAULT_PER_PAGE = 10

async function listAccessLogs (req: Request, res: Response) {
  try {
    // TODO: countからselectまでトランザクションを張る? (件数が変わると困る)
    const countOfRecords = await table.getCountOfAccessLogs()

    const pageStr = req.query.page?.toString()
    const page = parsePositiveInteger(pageStr) ?? 1

    const perPageStr = req.query.per_page?.toString()
    const perPage = parsePositiveInteger(perPageStr) ?? DEFAULT_PER_PAGE

    // page, perPageは正の整数であることが保証されている
    const logs = await table.listAccessLogs(
      undefined,
      undefined,
      undefined,
      perPage,
      perPage * (page - 1))

    const urlOfEndpoint = req.protocol + '://' + req.hostname + ':' + amsOptions.port + req.baseUrl + req.path
    const baseUrl = urlOfEndpoint + '?per_page=' + perPage

    const nextPage = baseUrl + '&page=' + (page + 1)
    const prevPage = baseUrl + '&page=' + (page - 1)
    const totalPage = Math.ceil(countOfRecords / perPage)

    const json = {
      meta: {
        page: page,
        next_page: page < totalPage ? nextPage : null,
        prev_page: page > 1 ? prevPage : null,
        contains: logs.length,
        total: countOfRecords,
        total_page: totalPage,
        per_page: perPage
      },
      data: logs
    }
    res.status(200).json(json)
  } catch (err) {
    console.error('[!] DB Error:', err)
    res.status(500).json({ message: err.message || 'internal server error' })
  }
}

async function listAccessLogsBulk (req: Request, res: Response) {
  const fmtStr = 'YYYY-MM-DD'
  dayjs.extend(customParseFormat)
  dayjs.locale('ja')
  try {
    const sinceStr = req.query.since?.toString()
    const untilStr = req.query.until?.toString()

    let since: string
    if (sinceStr === undefined) {
      // sinceのデフォルトは「今日の90日前」
      since = dayjs().startOf('day').subtract(90, 'd').format(fmtStr)
    } else {
      const dayjsSince = dayjs(sinceStr, fmtStr, true)
      if (!dayjsSince.isValid()) {
        console.error('[!] \'since\' is malformed:', sinceStr)
        res.status(400).json({ message: '\'since\' is malformed' })
        return
      }
      since = dayjsSince.format(fmtStr)
    }

    let until: string
    if (untilStr === undefined) {
      // untilのデフォルトは「今日」
      until = dayjs().startOf('day').format(fmtStr)
    } else {
      const dayjsUntil = dayjs(untilStr, fmtStr, true)
      if (!dayjsUntil.isValid()) {
        console.error('[!] \'until\' is malformed:', untilStr)
        res.status(400).json({ message: '\'until\' is malformed' })
      }
      until = dayjsUntil.format(fmtStr)
    }

    // LIMITに十分大きい数字を渡すことで(実質上)全レコードを取得する
    const logs = await table.listAccessLogs(
      since,
      until,
      undefined,
      (1 << 30))

    const json = {
      meta: {
        since: since,
        until: until
      },
      data: logs
    }
    res.status(200).json(json)
  } catch (err) {
    console.error('[!] DB Error:', err)
    res.status(500).json({ message: err.message || 'internal server error' })
  }
}

export { listAccessLogs, listAccessLogsBulk }
