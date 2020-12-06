import { Router } from 'express'
import members from '../controllers/membersController'

const router = Router()

// Create a new Member
router.post('/members', members.create)

// Retrieve all Members
router.get('/members', members.findAll)

// Retrieve a single Member with memberId
router.get('/members/:memberId', members.findOne)

// Update a Member with memberId
router.put('/members/:memberId', members.update)

// Delete a Member with memberId
router.delete('/members/:memberId', members.delete)

// Create a new Member
router.delete('/members', members.deleteAll)

export default router
