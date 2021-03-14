import { Request, Response } from 'express'
import * as table from '../models/accessLogsModel'
import { amsOptions } from '../../config'

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
  // TODO: countからselectまでトランザクションを張る? (件数が変わると困る)
  const [countOfRecords, error] = await table.getCountOfAccessLogs()

  if (error) {
    res.status(500).json({ message: error.message || 'internal server error' })
    return
  }

  const pageStr = req.query.page?.toString()
  const page = parsePositiveInteger(pageStr) ?? 1

  const perPageStr = req.query.per_page?.toString()
  const perPage = parsePositiveInteger(perPageStr) ?? DEFAULT_PER_PAGE

  // page, perPageは正の整数であることが保証されている
  const [logs, error2] = await table.listAccessLogs(
    undefined,
    undefined,
    undefined,
    perPage,
    perPage * (page - 1))

  if (error2) {
    res.status(500).json({ message: error2?.message || 'internal server error' })
  } else {
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
  }
}

export { listAccessLogs }
