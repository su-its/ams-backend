"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var membersModel_1 = __importDefault(require("../models/membersModel"));
// Create and Save a new Member
exports.create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var member, result, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // Validate request
                if (!req.body) {
                    res.status(400).send({
                        message: 'Content can not be empty!'
                    });
                }
                member = new membersModel_1.default({
                    id: req.body.id,
                    name: req.body.name,
                    grade: req.body.grade,
                    is_holder: req.body.is_holder
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, membersModel_1.default.create(member)];
            case 2:
                result = _a.sent();
                if (result.error) {
                    res.status(500).send({
                        message: result.error.sqlMessage || 'Some error occurred while creating the Member.'
                    });
                }
                else {
                    res.send(result.data);
                }
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                console.error(e_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
// Retrieve all Members from the database.
exports.findAll = function (req, res) {
    membersModel_1.default.getAll(function (err, data) {
        if (err)
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving members.'
            });
        else
            res.send(data);
    });
};
// Find a single Member with a memberId
exports.findOne = function (req, res) {
    membersModel_1.default.findById(req.params.memberId, function (err, data) {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: "Not found Member with id " + req.params.memberId + "."
                });
            }
            else {
                res.status(500).send({
                    message: 'Error retrieving Member with id ' + req.params.memberId
                });
            }
        }
        else
            res.send(data);
    });
};
// Update a Member identified by the memberId in the request
exports.update = function (req, res) {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!'
        });
    }
    console.log(req.body);
    membersModel_1.default.updateById(req.params.memberId, new membersModel_1.default(req.body), function (err, data) {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: "Not found Member with id " + req.params.memberId + "."
                });
            }
            else {
                res.status(500).send({
                    message: 'Error updating Member with id ' + req.params.memberId
                });
            }
        }
        else
            res.send(data);
    });
};
// Delete a Member with the specified memberId in the request
exports.delete = function (req, res) {
    membersModel_1.default.remove(req.params.memberId, function (err, data) {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: "Not found Member with id " + req.params.memberId + "."
                });
            }
            else {
                res.status(500).send({
                    message: 'Could not delete Member with id ' + req.params.memberId
                });
            }
        }
        else
            res.send({ message: "Member was deleted successfully!" });
    });
};
// Delete all Members from the database.
exports.deleteAll = function (req, res) {
    membersModel_1.default.removeAll(function (err, data) {
        if (err)
            res.status(500).send({
                message: err.message || 'Some error occurred while removing all members.'
            });
        else
            res.send({ message: "All Members were deleted successfully!" });
    });
};
