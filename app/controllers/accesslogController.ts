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
  const studentId = req.body.student_id
  if (studentId === undefined) {
    res.status(400).send({
      message: 'student_id was empty'
    })
    return
  } else if (typeof studentId !== 'number') {
    res.status(400).send({
      message: 'student_id was not a number'
    })
    return
  }

  const ag = process.env.ALLOW_GUEST ? process.env.ALLOW_GUEST : 'on'
  try {
    const answer = await judgeActionAndSetRecord(studentId, ag) // 'exit' | 'enter' | 'Not a member' | 'syserror'
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
