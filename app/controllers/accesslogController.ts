import { Request, Response } from 'express'
import { getAll, judgeAction, countNumOfPeople } from '../models/accesslogModel'
import { postMessage } from '../slack/notifyToSlack'

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
  if (!req.query.hasOwnProperty('member_id') || (req.query.member_id as string).length === 0) {
    res.status(400).send({
      message: 'member_id was empty.'
    }).end()
    return
  }

  const member_id: number = parseInt(req.query.member_id as string)
  try {
    const answer = await judgeAction(member_id) // 'exit' | 'enter' | 'Not a member' | 'syserror'
    res.send({action: answer}).end()
    if (answer == 'enter' || answer == 'exit') {
      const num = await countNumOfPeople()
      if (num < 0) {
        console.error('Error occured while counting number of people.')
      } else {
        if (num == 0) postMessage('Status : Locked :lock: (No one in the room)', new Date().toLocaleTimeString())
        else if (num >= 1) postMessage('Status : Open :wink:', new Date().toLocaleTimeString())
      }
    }
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
