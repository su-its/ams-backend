const { searchWithFilter, getAll, judgeAction, countNinzu } = require('../models/accesslogModel')
const chat = require('../slack/notifyToSlack')

// Retrieve all accesslogs from the database.
const findAll = (req, res) => {
  getAll()
  .then((data) => {
    res.send(data).end()
  })
  .catch(err =>
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving logs.'
    }).end()
  )
}

// Find accesslogs of single Member with a memberId
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

const cardTouched = (req, res) => {
  if (req.query.student_id === undefined) {
    res.status(400).send({
      message: 'student_id was not set in the request query.'
    }).end()
    return
  }

  // enter, exit or error
  judgeAction(req.query.student_id)
  .then(answer => {
    res.send({action: answer}).end() // default
    if (answer === 'error') return
    else return countNinzu() /* point1 return function() which returns Promise<something> countNinzu() */
  })
  .then(num => { /* point2 handle success of countNinzu() (callback of countNinzu()) */
    chat.postMessage(num)
  })
  .catch(e => {
    console.error(e)
    res.status(500).send({
      message: e.message || 'Some error occured.'
    }).end()
  })
}

module.exports = { findWithQuery, findAll, cardTouched }