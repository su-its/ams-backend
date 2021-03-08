import { Request, Response } from 'express'
import * as table from '../models/accessLogsModel'
import { amsOptions } from '../../config'

/**
 * ページを示す文字列を整数にパースする
 * 正の整数を示す入力以外が来た場合はデフォルト値 1 を返す
 */
function parsePage (s: string | undefined): number {
  if (s) {
    const i = parseInt(s)
    if (Number.isInteger(i) && i > 0) {
      return i
    }
  }
  return 1
}

const DATA_PAR_PAGE = 20

async function listAccessLogs (req: Request, res: Response) {
  const [countOfRecords, error] = await table.getCountOfAccessLogs()

  if (error) {
    res.status(500).json({ message: error.message || 'internal server error' })
    return
  }

  const pageStr = req.query.page?.toString()
  const page = parsePage(pageStr)

  // pageは正の整数であることが保証されている
  const [logs, error2] = await table.listAccessLogs(
    undefined,
    undefined,
    undefined,
    DATA_PAR_PAGE,
    DATA_PAR_PAGE * (page - 1))

  if (error2) {
    res.status(500).json({ message: error?.message || 'internal server error' })
  } else {
    const urlOfEndpoint = req.protocol + '://' + req.hostname + ':' + amsOptions.port + req.baseUrl + req.path

    const nextPage = urlOfEndpoint + '?page=' + (page + 1)
    const prevPage = urlOfEndpoint + '?page=' + (page - 1)
    const totalPage = Math.ceil(countOfRecords / DATA_PAR_PAGE)

    const json = {
      page: page,
      next_page: page < totalPage ? nextPage : undefined,
      prev_page: page > 1 ? prevPage : undefined,
      total_page: totalPage,
      data: logs
    }
    res.status(200).json(json)
  }
}

export { listAccessLogs }
