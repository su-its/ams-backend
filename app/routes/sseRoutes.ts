import { Router } from 'express'
import { addSubscriber } from '../controllers/sseController'

const router = Router()

// router.get('/subscribe', addSubscriber) // こっちでもいいかも
router.get('/users_updated_event', addSubscriber)

export { router }
