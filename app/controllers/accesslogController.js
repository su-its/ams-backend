const { searchWithFilter, getAll, judgeAction, countNumOfPeople } = require('../models/accesslogModel')
const chat = require('../slack/notifyToSlack')

// Retrieve all accesslogs from the database.
const findAll = async (req, res) => {
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
const findWithQuery = (req, res) => {
  searchWithFilter(req.query)
  .then(data => res.send(data).end())
  .catch(e => {
    console.error(e)
    res.status(404).send({
      message: e.message || 'Not found.'
    }).end()
  })
}

const cardTouched = async (req, res) => {
  if (!req.query.hasOwnProperty('student_id') || req.query.student_id.length === 0) {
    res.status(400).send({
      message: 'student_id was empty.'
    }).end()
    return
  }

  try {
    const answer = await judgeAction(req.query.student_id) // 'exit' | 'enter' | 'Not a member' | 'syserror'
    res.send({action: answer}).end()
    if (answer == 'enter' || answer == 'exit') {
      const num = await countNumOfPeople()
      if (num < 0) {
        console.error('Error occured while counting number of people.')
      } else {
        if (num == 0) chat.postMessage('Status : Locked :lock: (No one in the room)', new Date().toLocaleTimeString())
        else if (num >= 1) chat.postMessage('Status : Open :wink:', new Date().toLocaleTimeString())
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

module.exports = { findWithQuery, findAll, cardTouched }
