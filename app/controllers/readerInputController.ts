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
  spawnSync('aplay', ['-q', fileName + '.wav'], { cwd: WAV_FILE_DIR, stdio: 'inherit' })
}

async function handleReaderInput (req: Request, res: Response) {
  // reader-bridgeにOKを帰す
  res.status(200).send('OK')

  const readerStatus = req.body.status
  const receivedUserId = req.body.user_id

  function isValidStatus (status: any) {
    // statusがtruthyであることを確認する
    if (!status) return false
    // statusが正しいStatusかであることを確認する
    else if (!Object.values(Status).includes(status)) return false
    return true
  }

  if (!isValidStatus(readerStatus)) {
    res.status(400).json({
      message: 'Invalid status in body'
    })
    // 一応ログに
    console.error('Received a request including invalid status')
  }

  // reader-bridgeからのリクエストを正しく受け取ったことを音で知らせる
  switch (readerStatus) {
    case Status.SUCCESS:
      playWav(Status.SUCCESS)
      break
    case Status.ERROR:
      playWav(Status.ERROR)
      console.error('[!] Reader-bridge status', Status.ERROR)
      return
    case Status.FATAL:
      playWav(Status.FATAL)
      console.error('[!] Reader-bridge status', Status.FATAL)
      return
    default:
      /* isValidStatus()でチェックするので多分ここには来ない */
      console.error('[!] 日本はもう終わりよ～ん')
      return
  }

  // 入室or退室処理
  const [user, error] = await roomTable.getUser(receivedUserId)
  if (error) {
    console.error('[!] Error:', error)
    return
  }

  try {
    await mysql.beginTransaction()
    if (user) {
      // 退室
      playWav('out')
      await logsTable.createAccessLog(user.user_id, user.entered_at)
      await roomTable.deleteUser(user.user_id)
    } else {
      // 入室
      playWav('in')
      await roomTable.createUser(receivedUserId)
    }
    await mysql.commit()
  } catch (error) {
    console.error('[!] Error:', error)
    await mysql.rollback()
  }
}

export { handleReaderInput }
