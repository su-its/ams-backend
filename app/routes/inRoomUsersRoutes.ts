import { Router } from 'express'
import { getUser, listUsers } from '../controllers/inRoomUsersController'

const router = Router()

// Retrieve all users in the room
router.get('/users_in_room', listUsers)

// Find a user in the room by user_id (user_idが数字のときここにマッチ)
router.get('/users_in_room/:user_id(\\d+)', getUser)

export { router }
