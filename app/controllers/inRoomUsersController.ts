import { Request, Response } from 'express'
import * as table from '../models/inRoomUsersModel'

async function getUser (req: Request, res: Response) {
  const [user, error] = await table.getUser(parseInt(req.params.user_id))
  if (error) {
    res.status(500).json({ message: error.message || 'internal server error' })
  } else {
    if (!user) res.status(204).send() // 指定された人が在室していなかったとき
    else res.status(200).json(user)
  }
}

async function listUsers (_req: Request, res: Response) {
  const [users, error] = await table.listUsers()
  if (error) {
    res.status(500).json({ message: error.message || 'internal server error' })
  } else {
    res.status(200).json(users)
  }
}

export { getUser, listUsers }
