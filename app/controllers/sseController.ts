/* eslint-disable camelcase */
import { Request, Response } from 'express'
import { emitter } from './readerInputController'
import * as roomTable from '../models/inRoomUsersModel'

// TODO あとでmodelsかどこかのファイルに移動する
/**
 * クライアントに返すデータの構造のもと
 */
interface InRoomUser {
  'user_id': number,
  'entered_at': Date
}

// TODO あとでmodelsかどこかのファイルに移動する
/**
 * クライアントに返すデータの構造
 */
interface NamedInRoomUser extends InRoomUser {
  'user_name': string | null
}

const clients: Response[] = []

/**
 * `usersUpdated`という`event`フィールドを持つSSEを配列`clients`内の全ての
 * クライアントに対して投げる関数。`emitter`(events.EventEmitter)の発火する
 * `usersUpdated`イベントのコールバック関数として使用する。80行目あたりを参照。
 *
 * Server-Sent eventsについて
 * https://html.spec.whatwg.org/multipage/server-sent-events.html
 */
async function sendUsersUpdatedEvent () {
  const [users, err] = await roomTable.listUsers()
  if (err) {
    // listUsers()でエラーがあったら一旦全クライアントとのストリームを閉じる。
    for (const res of clients) {
      // status codeが4xxや5xxだった時点でクライアント側ではEventSourceのerrorイベントが
      // 発火し、数秒後に再接続をトライしてくる。だからここは迷わずコネクションを切ってよし。
      // ただし何度もリトライされても困るのでクライアントには3回トライしたら止めるなど配慮してほしい。
      res.status(500).json({ message: err?.message || 'internal server error' })
    }
  } else {
    for (const user of users as NamedInRoomUser[]) {
      user.user_name = null
    }

    try {
      const json = JSON.stringify(users)
      // イベント名は任意。全て小文字の方がいいのかな?
      for (const res of clients) {
        res.status(200).write(`event: usersUpdated\ndata: ${json}\n\n`)
      }
    } catch (err) {
      console.error(err)
      for (const res of clients) {
        res.status(500).json({ message: 'internal server error' })
      }
    }
  }
}

/**
 * @param {Express.Request} _req - HTTPリクエスト
 * @param {Express.Response} res - HTTPレスポンス
 * `/{version}/users_updated_event`に来たリクエストについて対応するレスポンスに
 * 適切なレスポンスヘッダーを設定して、それを配列`clients`に格納する関数。
 */
function sseHandler (_req: Request, res: Response) {
  // 適切なレスポンスヘッダーを設定
  res.set({
    'Content-Type': 'text/event-stream', // event-streamでクライアント-サーバー間を繋ぎっぱなしにする
    'Cache-Control': 'no-store' // レスポンスがキャッシュに保存されないようにする(クライアント側でも同じことをしているが一応)
  })

  // hello world
  res.status(200).write('data: hello\n\n') // nnは必須 コネクションが切れてしまうのでsend()は使わない

  // リストに追加
  clients.push(res)
  // printCurState() // デバッグ用
}

// ここが最初に実行される
// listenerの登録
emitter.on('usersUpdated', sendUsersUpdatedEvent)

// eslint-disable-next-line no-unused-vars
function printCurState () {
  console.log(new Date().toISOString(), 'Current State')
  for (const evtName of emitter.eventNames()) {
    console.log(`${emitter.listenerCount(evtName)} listener(s) is listening to ${String(evtName)} event.`)
  }
  console.log(`Current clients has ${clients.length} connection(s).`)
}

export { sseHandler }
