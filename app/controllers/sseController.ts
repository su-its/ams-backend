/* eslint-disable camelcase */
import { Request, Response } from 'express'
import { emitter } from './readerInputController'
import * as roomTable from '../models/inRoomUsersModel'
import EventEmitter from 'events'

/**
 * CORS用
 * // TODO corsブランチをマージしたら消す
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
    'Content-Type': 'text/event-stream', // event-streamでクライアント-サーバー間を繋ぎっぱなしにする
    'Cache-Control': 'no-store' // レスポンスがキャッシュに保存されないようにする(クライアント側でも同じことをしているが一応)
  })

  // hello world
  res.status(200).write('data: hello\n\n') // nnは必須 コネクションが切れてしまうのでsend()は使わない

  // ブラウザーの再読み込みを繰り返すとその度にEventEmitterにlistenerが追加され、10を超えると
  // 'MaxListenersExceededWarning: Possible EventEmitter memory leak detected.'
  // のような警告が出る。とりあえずは警告が出そうになったらこのイベントに登録済みのlistenerたちを解除する
  // TODO EventEmitterからlistenerが外れてもフロントエンド側とのコネクションが切れるわけではないのでそこを何とかする
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
      // TODO
      // とりあえずuser_nameは仮で割り当てる。user_nameはstringかnullにしてある(undefinedではない!)
      // 最悪Array<any>でも可
      (users as Array<{ user_id: number, user_name: string | null, entered_at: Date }>).forEach(user => {
        user.user_name = null
      })
      try {
        const json = JSON.stringify(users)
        // イベント名は任意。全て小文字の方がいいのかな?
        res.status(200).write(`event: usersUpdated\ndata: ${json}\n\n`)
      } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'internal server error' })
      }
    }
  })
}
