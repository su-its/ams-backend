import { Router } from 'express'
import { cardTouched, findAll } from '../controllers/accesslogController'

const router = Router()

// Retrieve AccessLog
router.get('/accesslog', findAll)

router.get('/card_touch', cardTouched)

export default router