const router = require('express').Router()
const {cardTouched, findAll, findWithQuery} = require('../controllers/accesslogController')

// Retrieve AccessLog
router.get('/accesslog', (req, res) => {
  if (req.query.studentId) findWithQuery(req, res)
  else findAll(req, res)
})

router.get('/card_touch', cardTouched)

module.exports = { routes: router }
