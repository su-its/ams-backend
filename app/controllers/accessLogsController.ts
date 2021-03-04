import { Request, Response } from 'express'
import * as table from '../models/accessLogsModel'

async function listAccessLogs (req: Request, res: Response) {
  const [logs, error] = await table.listAccessLogs(
    req.query.since ? req.query.since.toString() : undefined,
    req.query.until ? req.query.until.toString() : undefined,
    req.query.order ? req.query.order.toString() : undefined,
    req.query.limit ? parseInt(req.query.limit.toString()) : undefined,
    req.query.offset ? parseInt(req.query.offset.toString()) : undefined)

  if (error) {
    res.status(500).json({ message: error.message || 'internal server error' })
  } else {
    res.status(200).json(logs)
  }
}

export { listAccessLogs }
