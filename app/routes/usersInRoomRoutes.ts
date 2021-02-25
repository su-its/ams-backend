import { Router } from 'express'
import { getUser, getUsers } from '../controllers/usersInRoomController'

const router = Router()

// Retrieve all users in the room
router.get('/users_in_room', getUsers)

// Find a user in the room by userId
router.get('/users_in_room/:userId', getUser)

export default router
