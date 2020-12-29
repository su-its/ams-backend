import { Router } from 'express'
import { cardTouched, findAll } from '../controllers/accesslogController'

const router = Router()

// Retrieve AccessLog
router.get('/access_log', findAll)

router.post('/access_log', cardTouched)

export default router
