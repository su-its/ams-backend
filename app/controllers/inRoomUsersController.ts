import { Request, Response } from 'express'
import * as table from '../models/inRoomUsersModel'

async function getUser (req: Request, res: Response) {
  try {
    const user = await table.getUser(parseInt(req.params.user_id))
    if (!user) {
      res.status(204).send() // 指定された人が在室していなかったとき
    } else {
      const toBeSent = {
        data: [user]
      }
      res.status(200).json(toBeSent)
    }
  } catch (err) {
    console.error('[!] DB Error:', err)
    res.status(500).json({ message: err.message || 'internal server error' })
  }
}

async function listUsers (_req: Request, res: Response) {
  try {
    const users = await table.listUsers()
    const toBeSent = {
      data: users
    }
    res.status(200).json(toBeSent)
  } catch (err) {
    console.error('[!] DB Error:', err)
    res.status(500).json({ message: err.message || 'internal server error' })
  }
}

export { getUser, listUsers }
