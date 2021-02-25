import { Request, Response } from 'express'
import * as table from '../models/usersInRoomModel'

const getUser = async (req: Request, res: Response) => {
  const [user, error] = await table.readUser(parseInt(req.params.userId))
  if (error) {
    res.status(500).json({ message: error.message || 'internal server error' })
  } else {
    res.status(200).json(user)
  }
}

const getUsers = async (_req: Request, res: Response) => {
  const [users, error] = await table.readUsers()
  if (error) {
    res.status(500).json({ message: error.message || 'internal server error' })
  } else {
    res.status(200).json(users)
  }
}

export { getUser, getUsers }
