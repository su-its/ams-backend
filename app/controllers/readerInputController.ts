import { spawn } from 'child_process'
import { Request, Response } from 'express'
import * as roomTable from '../models/inRoomUsersModel'
import * as logsTable from '../models/accessLogsModel'
import mysql from '../database/db'

const Status = {
  SUCCESS: 'success',
  ERROR: 'error',
  FATAL: 'fatal'
} as const

const handleReaderInput = async (req: Request, res: Response) => {
  res.status(200).send()

  const readerStatus = req.body.status
  const receivedUserId = req.body.user_id

  if (!readerStatus || !receivedUserId) {
    // spawn('aplay', ['-q', 'error.wav'], { cwd: process.cwd() })
    return
  }

  switch (readerStatus) {
    case Status.SUCCESS:
      // spawn('aplay', ['-q', 'success.wav'], { cwd: process.cwd() })
      break
    case Status.ERROR:
      // spawn('aplay', ['-q', 'error.wav'], { cwd: process.cwd() })
      break
    case Status.FATAL:
      // spawn('aplay', ['-q', 'fatal.wav'], { cwd: process.cwd() })
      break
    default:
      /* never */
      // spawn('aplay', ['-q', 'error.wav'], { cwd: process.cwd() })
  }

  const [user, error] = await roomTable.getUser(receivedUserId)
  if (error) {
    // 例えばconsole.log(error)などしてログに残したい
    return
  }

  try {
    await mysql.beginTransaction()
    if (user) {
      await logsTable.createAccessLog(user.user_id, user.entered_at)
      await roomTable.deleteUser(user.user_id)
    } else {
      await roomTable.createUser(receivedUserId)
    }
    await mysql.commit()
  } catch (error) {
    await mysql.rollback()
  }
}

export { handleReaderInput }
