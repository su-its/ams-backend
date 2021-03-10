import { Request, Response } from 'express'
import { emitter } from './readerInputController'
import * as roomTable from '../models/inRoomUsersModel'

/**
 * CORS用
 */
const frontEndOrigin = 'http://localhost:8000'

export function sseHandler (req: Request, res: Response) {
  res.set({
    'Access-Control-Allow-Origin': frontEndOrigin,
    'Content-Type': 'text/event-stream' // event-streamでクライアント-サーバー間を繋ぎっぱなしにする
  })
  res.status(200).write('data: hello\n\n') // nnは必須

  emitter.on('usersUpdated', async () => {
    const [users, err] = await roomTable.listUsers()
    if (err) {
      // do something
      res.status(500).send('error')
    } else {
      res.status(200).write(`data: ${JSON.stringify(users)}\n\n`)
    }
  })
}
