import { spawn } from 'child_process'
import { Request, Response } from 'express'
import * as roomTable from '../models/inRoomUsersModel'
import * as logsTable from '../models/accessLogsModel'

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

  const [user, error] = await roomTable.readUser(receivedUserId)
  if (error) {
    // 例えばconsole.log(error)などしてログに残したい
    return
  }

  if (user.length === 0) {
    await roomTable.createUser(receivedUserId)
  } else {
    await logsTable.createAccessLog(user.user_id, user.entered_at)
    await roomTable.deleteUser(user.user_id)
  }
}

export { handleReaderInput }
