import { Router } from 'express'
import { sseHandler } from '../controllers/sseController'

const router = Router()

router.get('/users_updated_event', sseHandler)

export default router
