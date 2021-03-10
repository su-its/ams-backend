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

  emitter.on('usersUpdated', async function sendUsersUpdatedEvent () {
    const [users, err] = await roomTable.listUsers()
    if (err) {
      // status codeが4xxや5xxだった時点でEventSource(クライアント側)はcloseする。再接続もしない
      res.status(500).json({ message: err?.message || 'internal server error' })
    } else {
      res.status(200).write(`data: ${JSON.stringify(users)}\n\n`)
    }
  })
}
