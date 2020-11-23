const router = require('express').Router()
const members = require('../controllers/membersController')

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

module.exports = { routes: router }
