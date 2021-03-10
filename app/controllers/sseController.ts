import { Request, Response } from 'express'
import { emitter } from './readerInputController'
import * as roomTable from '../models/inRoomUsersModel'
import EventEmitter from 'events'

/**
 * CORS用
 */
const frontEndOrigin = 'http://localhost:8000'

/**
 * @param {Express.Request} _req - HTTPリクエスト
 * @param {Express.Response} res - HTTPレスポンス
 * `/{version}/sse`に来たリクエストにストリームを開いて繋ぎっぱなしにする。
 * 在室者のリストの変更を検知して更新されたリストをpush(≒プッシュ通知)する。
 *
 * Server-Sent eventsについて
 * https://html.spec.whatwg.org/multipage/server-sent-events.html
 */
export function sseHandler (_req: Request, res: Response) {
  res.set({
    'Access-Control-Allow-Origin': frontEndOrigin, // オリジン間リソース共有をこのオリジンとだけ許可
    'Content-Type': 'text/event-stream' // event-streamでクライアント-サーバー間を繋ぎっぱなしにする
  })

  // hello world
  res.status(200).write('event: hello\ndata: hello\n\n') // nnは必須 コネクションが切れてしまうのでsend()は使わない

  // ブラウザーの再読み込みを繰り返すとその度にEventEmitterにlistenerが追加され、10を超えると
  // 'MaxListenersExceededWarning: Possible EventEmitter memory leak detected.'
  // のような警告が出る。とりあえずは警告が出そうになったらこのイベントに登録済みのlistenerたちを解除する
  if (emitter.listenerCount('usersUpdated') + 1 > EventEmitter.defaultMaxListeners) {
    emitter.removeAllListeners('usersUpdated')
  }

  // readerInputControllerで処理が走るとuserUpdatedイベントが発火するので、
  // そのタイミングでクライアントにpushするためにリスナーを登録する
  emitter.on('usersUpdated', async function sendUsersUpdatedEvent () {
    const [users, err] = await roomTable.listUsers()
    if (err) {
      // status codeが4xxや5xxだった時点でクライアント側ではEventSourceのerrorイベントが
      // 発火する。たぶん数秒後に再接続をトライする
      res.status(500).json({ message: err?.message || 'internal server error' })
    } else {
      // イベント名は任意。小文字の方がいいのかな?
      res.status(200).write(`event: usersUpdated\ndata: ${JSON.stringify(users)}\n\n`)
    }
  })
}
