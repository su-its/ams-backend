import { Router } from 'express'
import {
  createMember, deleteAllMembers, deleteMember, getAllMembers, getMember, updateMember
} from '../controllers/membersController'

const router = Router()

// Create a new Member
router.post('/members', createMember)

// Retrieve all Members
router.get('/members', getAllMembers)

// Retrieve a single Member with memberId
router.get('/members/:memberId', getMember)

// Update a Member with memberId
router.put('/members/:memberId', updateMember)

// Delete a Member with memberId
router.delete('/members/:memberId', deleteMember)

// Create a new Member
router.delete('/members', deleteAllMembers)

export default router
