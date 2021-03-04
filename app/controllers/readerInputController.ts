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

  const isValidStatus = (s: string) => {
    for (const itr of Object.values(Status)) {
      if (itr === s) return true
    }
    return false
  }

  if (!isValidStatus(readerStatus)) {
    playWav(Status.FATAL)
    return
  }

  // reader-bridgeからのリクエストを正しく受け取ったことを音で知らせる
  switch (readerStatus) {
    case Status.SUCCESS:
      playWav(Status.SUCCESS)
      break
    case Status.ERROR:
      playWav(Status.ERROR)
      return
    case Status.FATAL:
      playWav(Status.FATAL)
      return
    default:
      /* isValidStatus()でちぇっくするので多分ここには来ない */
      playWav(Status.FATAL)
      return
  }

  // 入室or退室処理
  const [user, error] = await roomTable.getUser(receivedUserId)
  if (error) {
    // 例えばconsole.log(error)などしてログに残したい
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
    console.error(error)
    await mysql.rollback()
  }
}

export { handleReaderInput }
