const { searchWithFilter, getAll, judgeAction, countNinzu } = require('../models/accesslogModel')
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
    else return countNinzu() /* point1 `return someFunction()` which returns Promise<something> */
  })
  .then(num => { /* point2 handle success(resolve) of someFunction() (callback of someFunction()) */
    if (num < 0) { console.error('Error in count number of people.') }
    chat.postMessage(num)
    return
  })
  .catch(e => {
    console.error(e)
    res.status(500).send({
      message: e.message || 'Some error occured.'
    }).end()
    return
  })
}

module.exports = { findWithQuery, findAll, cardTouched }