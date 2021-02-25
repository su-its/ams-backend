import { Request, Response } from 'express'
import * as userTable from '../models/usersInRoomModel'
import * as logTable from '../models/accessLogsModel'

// enum Status {
//     SUCCESS = 'success',  // successfully read
//     ERROR   = 'error',    // failed to read
//     FATAL   = 'fatal'     // process will die
// }

const handleReaderInput = async (req: Request, res: Response) => {
  // switch (req.body.status) {
  //   case Status.SUCCESS:
  //     // 音出す
  //     break
  //   case Status.ERROR:
  //     // 音出す
  //     break
  //   case Status.FATAL:
  //     // 音出す
  //     break
  // }

  // ================
  // バリデーションする?
  // ================

  res.status(200).send()

  try {
    const user: any = await userTable.readUser(req.body.user_id)
    if (user.length === 0) {
      await userTable.createUser(req.body.user_id)
    } else {
      await logTable.createAccessLog(user.user_id, user.entered_at)
      await userTable.deleteUser(req.body.user_id)
    }
  } catch (error) {
    /* do nothing */
  }
}

export { handleReaderInput }
