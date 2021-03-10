import { Router } from 'express'
import { sseHandler } from '../controllers/sseController'

const router = Router()

router.get('/sse', sseHandler)

export default router
