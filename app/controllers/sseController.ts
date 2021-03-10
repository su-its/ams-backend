import { Request, Response } from 'express'

export function sseHandler (req: Request, res: Response) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000')
  res.setHeader('Content-Type', 'text/event-stream')
  setInterval(() => {
    res.status(200).write('event: message\ndata: ' + JSON.stringify({ greeting: 'Hello!', now: new Date().toISOString() }) + '\n\n')
  }, 2000)
}
