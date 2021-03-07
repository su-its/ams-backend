import { spawnSync } from 'child_process'
import { Request, Response } from 'express'
import { join } from 'path'
import * as roomTable from '../models/inRoomUsersModel'
import * as logsTable from '../models/accessLogsModel'
import mysql from '../database/db'

const WAV_FILE_DIR = join(process.cwd(), 'sound')

const Status = {
  SUCCESS: 'success',
  ERROR: 'error',
  FATAL: 'fatal'
} as const

function playWav (fileName: string) {
  // stdio: 'inherit'でnodeのstdioを子プロセスにも使わせる
  // asyncなspawnだとChildProcessが返ってきて世話するのが面倒くさいので、spawnSyncを使う
  // 順番通りに最後まで再生したいのでspawnSyncを使う
  spawnSync('aplay', ['-q', fileName + '.wav'], { cwd: WAV_FILE_DIR, stdio: 'inherit' })
}

async function handleReaderInput (req: Request, res: Response) {
  const readerStatus = req.body.status
  const receivedUserId = req.body.user_id

  function isValidStatus (status: any) {
    // statusがtruthyであることを確認する
    if (!status) {
      return false
    // statusが正しいStatusかであることを確認する
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

  // reader-bridgeからのリクエストを正しく受け取ったことを音で知らせる
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
      /* isValidStatus()でチェックするので多分ここには来ない */
      console.error('[!] 日本はもう終わりよ～ん')
      res.status(500).send()
      return
  }

  // 入室or退室処理
  const [user, error] = await roomTable.getUser(receivedUserId)
  if (error) {
    console.error('[!] Error:', error)
    res.status(500).json({ message: error.message || 'internal server error' })
    return
  }

  const isExit = !!user
  try {
    await mysql.beginTransaction()
    if (isExit) {
      // 退室
      const caResult = await logsTable.createAccessLog(user.user_id, user.entered_at)
      // 終了コードが0でなかったらthrowする
      if (caResult !== 0) {
        throw caResult
      }
      const duResult = await roomTable.deleteUser(user.user_id)
      if (duResult !== 0) {
        throw duResult
      }
    } else {
      // 入室
      const cuResult = await roomTable.createUser(receivedUserId)
      if (cuResult !== 0) {
        throw cuResult
      }
    }
    await mysql.commit()
  } catch (error) {
    playWav('error')
    console.error('[!] Error:', error)
    await mysql.rollback()
    res.status(500).json({ message: error.message || 'internal server error' })
    return
  }

  // 処理が一通り終わったので音を鳴らす
  playWav(isExit ? 'out' : 'in')

  res.status(204).send()
}

export { handleReaderInput }
