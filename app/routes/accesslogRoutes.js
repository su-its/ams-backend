"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var accesslogController_1 = require("../controllers/accesslogController");
var router = express_1.Router();
// Retrieve AccessLog
router.get('/accesslog', function (req, res) {
    if (req.query.student_id)
        accesslogController_1.findWithQuery(req, res);
    else
        accesslogController_1.findAll(req, res);
});
router.get('/card_touch', accesslogController_1.cardTouched);
exports.default = router;
