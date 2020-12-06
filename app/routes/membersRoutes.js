"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var membersController_1 = __importDefault(require("../controllers/membersController"));
var router = express_1.Router();
// Create a new Member
router.post('/members', membersController_1.default.create);
// Retrieve all Members
router.get('/members', membersController_1.default.findAll);
// Retrieve a single Member with memberId
router.get('/members/:memberId', membersController_1.default.findOne);
// Update a Member with memberId
router.put('/members/:memberId', membersController_1.default.update);
// Delete a Member with memberId
router.delete('/members/:memberId', membersController_1.default.delete);
// Create a new Member
router.delete('/members', membersController_1.default.deleteAll);
exports.default = router;
