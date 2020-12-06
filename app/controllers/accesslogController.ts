import { Request, Response } from 'express'
const { searchWithFilter, getAll, judgeAction, countNumOfPeople } = require('../models/accesslogModel')
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

// Find accesslogs of single Member with a member id
//TODO
const findWithQuery = (req: Request, res: Response) => {
  searchWithFilter(req.query)
  .then((data: any) => res.send(data).end())
  .catch((e: any) => {
    console.error(e)
    res.status(404).send({
      message: e.message || 'Not found.'
    }).end()
  })
}

const cardTouched = async (req: Request, res: Response) => {
  // if (!req.query.hasOwnProperty('memberId') || req.query.memberId.length === 0) {
  if (!req.query.hasOwnProperty('memberId')) {
    res.status(400).send({
      message: 'memberId was empty.'
    }).end()
    return
  }

  try {
    const answer = await judgeAction(req.query.memberId) // 'exit' | 'enter' | 'Not a member' | 'syserror'
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

export  { findWithQuery, findAll, cardTouched }
