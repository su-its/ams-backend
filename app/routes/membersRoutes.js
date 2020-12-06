"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var membersController_1 = require("../controllers/membersController");
var router = express_1.Router();
// Create a new Member
router.post('/members', membersController_1.createMember);
// Retrieve all Members
router.get('/members', membersController_1.getAllMembers);
// Retrieve a single Member with memberId
router.get('/members/:memberId', membersController_1.getMember);
// Update a Member with memberId
router.put('/members/:memberId', membersController_1.updateMember);
// Delete a Member with memberId
router.delete('/members/:memberId', membersController_1.deleteMember);
// Create a new Member
router.delete('/members', membersController_1.deleteAllMembers);
exports.default = router;
