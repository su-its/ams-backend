import { Request, Response } from 'express'
import { getAll, judgeActionAndSetRecord } from '../models/accesslogModel'

// Retrieve all accesslogs from the database.
const findAll = async (req: Request, res: Response) => {
  try {
    const all = await getAll()
    if (all.data) {
      res.send(all.data).end()
      return
    } else {
      res.status(500).send({
        message: all.error.message || 'Some error occurred while retrieving logs.'
      }).end()
      return
    }
  } catch (e) {
    console.error(e)
    return
  }
}

const cardTouched = async (req: Request, res: Response) => {
  if (!req.query.hasOwnProperty('student_id') || (req.query.student_id as string).length === 0) {
    res.status(400).send({
      message: 'student_id was empty.'
    }).end()
    return
  }

  const student_id = parseInt(req.query.student_id as string)
  try {
    const answer = await judgeActionAndSetRecord(student_id) // 'exit' | 'enter' | 'Not a member' | 'syserror'
    res.send({action: answer}).end()
    return
  } catch (e) {
    console.error(e)
    res.status(500).send({
      message: e.message || 'Some error occured.'
    }).end()
    return
  }
}

export  { findAll, cardTouched }
