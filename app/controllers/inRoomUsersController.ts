import { Request, Response } from 'express'
import * as table from '../models/inRoomUsersModel'

async function getUser (req: Request, res: Response) {
  const [user, err] = await table.getUser(parseInt(req.params.user_id))
  if (err) {
    res.status(500).json({ message: err.message || 'internal server error' })
  } else {
    if (!user) {
      res.status(204).send() // 指定された人が在室していなかったとき
    } else {
      const toBeSent = {
        data: [user]
      }
      res.status(200).json(toBeSent)
    }
  }
}

async function listUsers (_req: Request, res: Response) {
  const [users, err] = await table.listUsers()
  if (err) {
    res.status(500).json({ message: err.message || 'internal server error' })
  } else {
    const toBeSent = {
      data: users
    }
    res.status(200).json(toBeSent)
  }
}

export { getUser, listUsers }
