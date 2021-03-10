import { Request, Response } from 'express'
import { emitter } from './readerInputController'
import * as roomTable from '../models/inRoomUsersModel'

export function sseHandler (req: Request, res: Response) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000')
  res.setHeader('Content-Type', 'text/event-stream')

  emitter.on('usersUpdated', async () => {
    const [users, err] = await roomTable.listUsers()
    if (err) {
      // do something
      res.status(500).send('error')
    } else {
      // do something
      res.status(200).json(users)
    }
  })
}
