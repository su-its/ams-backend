import { Request, Response } from 'express'
import * as table from '../models/inRoomUsersModel'

const getUser = async (req: Request, res: Response) => {
  const [user, error] = await table.getUser(parseInt(req.params.userId))
  if (error) {
    res.status(500).json({ message: error.message || 'internal server error' })
  } else {
    res.status(200).json(user) // Nullable
  }
}

const listUsers = async (_req: Request, res: Response) => {
  const [users, error] = await table.listUsers()
  if (error) {
    res.status(500).json({ message: error.message || 'internal server error' })
  } else {
    res.status(200).json(users)
  }
}

export { getUser, listUsers }
