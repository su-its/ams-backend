import { Router } from 'express'
import { cardTouched, findAll, findWithQuery } from '../controllers/accesslogController'

const router = Router()

// Retrieve AccessLog
router.get('/accesslog', (req, res) => {
  if (req.query.student_id) findWithQuery(req, res)
  else findAll(req, res)
})

router.get('/card_touch', cardTouched)

export default router