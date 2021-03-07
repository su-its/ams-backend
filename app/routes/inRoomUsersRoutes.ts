import { Router } from 'express'
import { getUser, listUsers } from '../controllers/inRoomUsersController'

const router = Router()

// Retrieve all users in the room
router.get('/users_in_room', listUsers)

// Find a user in the room by user_id
router.get('/users_in_room/:user_id', getUser)

export default router
