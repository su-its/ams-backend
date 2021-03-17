/* eslint-disable camelcase */
import { EventEmitter } from 'events'
import { Request, Response } from 'express'
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

/**
 * SSEの送り先リスト
 */
let clients: {
  id: number, // クライアントを一意に識別するためにidを振る
  res: Response
}[] = []

/**
 * `usersUpdated`という`event`フィールドを持つSSEを配列`clients`内の全ての
 * クライアントに対して投げる関数。`emitter`(events.EventEmitter)の発火する
 * `usersUpdated`イベントのコールバック関数として使用する。111行目あたりを参照。
 *
 * Server-Sent eventsについて
 * https://html.spec.whatwg.org/multipage/server-sent-events.html
 *
 * Server-Sent eventsについて2
 * https://stackoverflow.com/questions/7636165/how-do-server-sent-events-actually-work/11998868
 */
async function sendUsersUpdatedEvent () {
  const [users, err] = await roomTable.listUsers()
  if (err) {
    // listUsers()でエラーがあったら一旦全クライアントとのコネクションを閉じる。
    for (const client of clients) {
      // コネクションが(サーバー側から)閉じられた時にクライアント側ではEventSourceのerrorイベントが
      // 発火し、数秒後に再接続をトライしてくる。だからここは迷わずコネクションを切ってよし。
      // ただし何度もリトライされても困るのでクライアントには3回トライしたら止めるなど配慮してほしい。
      client.res.end()
    }
  } else {
    for (const user of users as NamedInRoomUser[]) {
      // TODO まだ名前をDBに登録していないので表示させられないが、将来的につけたい
      user.user_name = null
    }

    try {
      const json = JSON.stringify({
        data: users
      })
      // イベント名は任意。全て小文字の方がいいのかな?
      for (const client of clients) {
        client.res.write(`event: usersUpdated\ndata: ${json}\n\n`, 'utf-8')
      }
    } catch (err) {
      console.error(err)
      for (const client of clients) {
        client.res.end()
      }
    }
  }
}

/**
 * `/{version}/users_updated_event`に来たリクエストについて対応するレスポンスに
 * 適切なレスポンスヘッダーを設定して、それを配列`clients`に格納する関数。
 * @param {Express.Request} req - HTTPリクエスト
 * @param {Express.Response} res - HTTPレスポンス
 */
function addSubscriber (req: Request, res: Response) {
  // 適切なレスポンスヘッダーを設定
  res.set({
    'Content-Type': 'text/event-stream; charset=utf-8', // event-streamでクライアント-サーバー間を繋ぎっぱなしにする
    'Cache-Control': 'no-store' // レスポンスがキャッシュに保存されないようにする(クライアント側でも同じことをしているが一応)
  })

  // https://stackoverflow.com/questions/7636165/how-do-server-sent-events-actually-work/11998868
  // https://masteringjs.io/tutorials/express/server-sent-events
  res.flushHeaders() // ヘッダー(ステータスコード含む)だけ送る

  // hello world デバッグ用
  // res.write('data: Hello World\n\n', 'utf-8') // nnは必須 コネクションが切れてしまうのでsend()は使わない

  // https://www.vhudyma-blog.eu/a-complete-guide-to-server-sent-events-in-javascript
  const id = Date.now()
  const client = {
    id: id, // 登録した時刻でクライアントを識別する
    res: res
  }

  // リストに追加
  clients.push(client)
  // printCurState() // デバッグ用

  // クライアント側がコネクションを切った場合、リストから除去する
  req.on('close', () => {
    clients = clients.filter(client => client.id !== id)
    // printCurState() // デバッグ用
  })
}

// ここが最初に実行される
// フロントエンドに通知するためのイベントを定義する
const emitter = new EventEmitter()

// listenerの登録
emitter.on('usersUpdated', sendUsersUpdatedEvent)

// 検知してもどうしようも無いが、もしエラーが出たら記録する
emitter.on('error', () => {
  console.error('[!] Some error related to "emitter(node:events.EventEmitter)" has occured')
  // さいきょうのえらーはんどりんぐ
})
// 最初に実行される部分終わり

/**
 * デバッグ用の関数。現在の`clients`と`emitter`の状態を表示する。
 * `emitter`の状態はずっと同じはず。むしろ変化したら異常。
 */
// eslint-disable-next-line no-unused-vars
function printCurState () {
  console.log(new Date().toISOString(), 'Current State')
  for (const evtName of emitter.eventNames()) {
    console.log(`${emitter.listenerCount(evtName)} listener(s) is listening to ${String(evtName)} event.`)
  }
  console.log(`Current clients has ${clients.length} connection(s).`)
}

export { emitter, addSubscriber }
