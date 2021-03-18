/* eslint-disable no-unused-vars */
import { spawnSync } from 'child_process'
import { Request, Response } from 'express'
import { join } from 'path'
import { emitter } from './sseController'
import * as roomTable from '../models/inRoomUsersModel'
import * as logsTable from '../models/accessLogsModel'
import mysql from '../database/db'

const WAV_FILE_DIR = join(process.cwd(), 'sound')

/**
 * {@link https://github.com/su-its/rdr-bridge rdr-bridge} から送られてくるであろうステータスの一覧を格納する定数。
 *
 */
const Status = {
  /** カードから番号が読み取れた */
  SUCCESS: 'success',
  /** カードとの通信時に何らかのエラーが発生した */
  ERROR: 'error',
  /** (rdr-bridge自身の)プロセスを終了する程度の深刻なエラーが発生した */
  FATAL: 'fatal'
} as const

/**
 * `WAV_FILE_DIR`ディレクトリ以下にある音声ファイルをaplayコマンドで再生する。
 *
 * @remarks
 * stdio: 'inherit'だとnodeのstdioに流れてしまって後で使えないので'pipe'を設定する。
 * asyncなspawnだとChildProcessが返ってきて世話するのが面倒くさいので、spawnSyncを使う。
 * 順番通りに最後まで再生したいのでspawnSyncを使う。
 *
 * @param fileName 再生したい音声ファイル
 */
function playWav (fileName: string): void {
  // aplay(Linux限定)コマンドを実行する
  const aplay = spawnSync('aplay', [fileName + '.wav'], { cwd: WAV_FILE_DIR, stdio: 'pipe' })

  // errorはコマンドを実行できなかった際にErrorオブジェクトが入る
  if (aplay.error) {
    console.error('[!] spawnSync error:', aplay.error)
  // statusは実行したコマンドの終了コードが入る
  // errorではないのでnullではないはずだが一応確認
  } else if (aplay.status !== null && aplay.status !== 0) {
    console.error('[!] aplay error:', aplay.stderr)
  }
}

/**
 * 入室/退室と時間によって挨拶のセリフを決定し、音声再生用関数を実行する。
 *
 * @param isExit 今回のタッチが退室であるか否か
 * @param now 現在時刻
 */
// TODO
// 必要な音声ファイルを用意する
function greet (isExit: boolean, now: Date): void {
  const h = now.getHours()
  if (isExit) {
    // 退室の時の挨拶
    if (h >= 5 && h < 17) {
      playWav('matakitene')
    } else if (h >= 17 && h < 20) {
      playWav('otsukare')
    } else {
      playWav('oyasumi')
    }
  } else {
    // 入室の時の挨拶
    if (h >= 4 && h < 9) {
      playWav('ohayo')
    } else if (h >= 9 && h < 17) {
      playWav('konnichiwa')
    } else {
      playWav('konbanwa')
    }
  }
}

/**
 * ルーターのコールバックとして呼ばれ、rdr-bridgeからのPOSTを処理する。
 *
 * @async
 * @see リクエストを投げてくるプログラムはこちら {@link https://github.com/su-its/rdr-bridge rdr-bridgeのリポジトリ}
 * @see expressのルーターについてはここを参照 {@link http://expressjs.com/en/4x/api.html#router Express 4.x - API Reference}
 * @param req リクエスト
 * @param res レスポンス
 */
async function handleReaderInput (req: Request, res: Response): Promise<void> {
  /** リクエストボディをJSONとしてパースしたときの`status`というプロパティの値 */
  const readerStatus = req.body.status
  /** リクエストボディをJSONとしてパースしたときの`user_id`というプロパティの値 */
  const receivedUserId = req.body.user_id

  /**
   * rdr-bridgeから受け取った`status`が適切かどうかを判定する。
   * 具体的には以下の両方が満たされていることをもって適切と判定する。
   * - `status`がtruthyであること
   * - `status`が `"success"`, `"error"`, `"fatal"`のいずれかであること
   *
   * @param status 判定したいstatus
   * @returns 適切ならtrue、そうでないならfalse
   */
  function isValidStatus (status: any) {
    // statusがtruthyであることを確認する
    if (!status) {
      return false
    // statusが正しいStatusであることを確認する
    } else if (!Object.values(Status).includes(status)) {
      return false
    }
    return true
  }

  // statusが適切かチェック
  if (!isValidStatus(readerStatus)) {
    res.status(400).json({
      message: 'Invalid status in body'
    })
    console.error('[!] Received a request including invalid status')
    return
  }

  switch (readerStatus) {
    case Status.SUCCESS:
      // ちゃんとしたIDが来ているかチェック
      if (!Number.isInteger(receivedUserId)) {
        res.status(400).json({
          message: 'Invalid user_id in body'
        })
        console.error('[!] Received a request including invalid user_id')
        return
      }
      break
    case Status.ERROR:
      playWav(Status.ERROR)
      console.error('[!] Reader-bridge status', Status.ERROR)
      res.status(204).send()
      return
    case Status.FATAL:
      playWav(Status.FATAL)
      console.error('[!] Reader-bridge status', Status.FATAL)
      res.status(204).send()
      return
    default:
      // isValidStatus()でチェックするので多分ここには来ない
      console.error('[!] 日本はもう終わりよ～ん')
      res.status(500).send()
      return
  }

  // 入室or退室処理
  const [user, err] = await roomTable.getUser(receivedUserId)
  if (err) {
    console.error('[!] Error:', err)
    res.status(500).json({ message: err.message || 'internal server error' })
    return
  }

  const isExit = !!user
  try {
    await mysql.beginTransaction()
    if (isExit) {
      // 退室
      const [_caResult, caErr] = await logsTable.createAccessLog(user.user_id, user.entered_at)
      // エラーがnullでなかったらthrowする
      if (caErr) {
        throw caErr
      }
      const [_duResult, duErr] = await roomTable.deleteUser(user.user_id)
      if (duErr) {
        throw duErr
      }
    } else {
      // 入室
      const [_cuResult, cuErr] = await roomTable.createUser(receivedUserId)
      if (cuErr) {
        throw cuErr
      }
    }
    await mysql.commit()
  } catch (err) {
    playWav('error')
    console.error('[!] Error:', err)
    await mysql.rollback()
    res.status(500).json({ message: err.message || 'internal server error' })
    return
  }

  // 処理が一通り終わったので音を鳴らす
  playWav(isExit ? 'out' : 'in')

  // TODO
  // 別にフラグは無くてもいい。要るならconfigに追加。要らないなら消す。
  const greetingNeeded = true
  if (greetingNeeded) {
    // 挨拶をする
    greet(isExit, new Date())
  }

  // イベントの発火
  emitter.emit('usersUpdated')

  res.status(204).send()
}

export { handleReaderInput }
