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
exports.deleteAllMembers = exports.deleteMember = exports.updateMember = exports.getMember = exports.getAllMembers = exports.createMember = void 0;
var db_1 = __importDefault(require("../database/db"));
// Create and Save a new Member
function createMember(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var newMember, _a, result, _, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    // Validate request
                    if (!req.body) {
                        res.status(400).send({
                            message: 'Content can not be empty!'
                        });
                    }
                    newMember = req.body;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, db_1.default.execute('INSERT INTO member_list (id,name,grade,is_holder) VALUES (?,?,?,?)', [
                            newMember.id, newMember.name, newMember.grade, newMember.is_holder
                        ])];
                case 2:
                    _a = _b.sent(), result = _a[0], _ = _a[1];
                    res.status(201).send(result);
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _b.sent();
                    console.error(e_1);
                    res.status(500).json({
                        message: e_1.sqlMessage || 'Some error occurred while creating the Member.'
                    });
                    return [2 /*return*/];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.createMember = createMember;
// Retrieve all Members from the database.
function getAllMembers(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, result, _, e_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db_1.default.query('SELECT * FROM member_list')];
                case 1:
                    _a = _b.sent(), result = _a[0], _ = _a[1];
                    res.send(result);
                    return [2 /*return*/];
                case 2:
                    e_2 = _b.sent();
                    console.error('error: ', e_2);
                    res.status(500).json({
                        message: e_2.message || 'Some error occurred while retrieving members.'
                    });
                    return [2 /*return*/];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getAllMembers = getAllMembers;
// Find a single Member with a memberId
function getMember(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, result, _, e_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db_1.default.execute('SELECT * FROM member_list WHERE id = ?', [req.params.memberId])];
                case 1:
                    _a = _b.sent(), result = _a[0], _ = _a[1];
                    if (!result.length) {
                        res.status(400).json({
                            message: "Not found Member with id " + req.params.memberId + "."
                        });
                        return [2 /*return*/];
                    }
                    console.log('found member: ', result[0]);
                    res.status(200).send(result);
                    return [2 /*return*/];
                case 2:
                    e_3 = _b.sent();
                    console.error(e_3);
                    res.status(500).json({
                        message: 'Error retrieving Member with id ' + req.params.memberId
                    });
                    return [2 /*return*/];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getMember = getMember;
// Update a Member identified by the memberId in the request
function updateMember(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var updatedMember, _a, result, _, e_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    // Validate Request
                    if (!req.body) {
                        res.status(400).send({
                            message: 'Content can not be empty!'
                        });
                    }
                    console.log(req.body);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    updatedMember = req.body;
                    return [4 /*yield*/, db_1.default.execute('UPDATE member_list SET ? WHERE id = ?', [
                            updatedMember, req.params.memberId
                        ])];
                case 2:
                    _a = _b.sent(), result = _a[0], _ = _a[1];
                    if (result.affectedRows == 0) {
                        res.status(404).json({
                            message: "Not found Member with id " + req.params.memberId + "."
                        });
                    }
                    console.log('updated member:', result);
                    res.send(result);
                    return [3 /*break*/, 4];
                case 3:
                    e_4 = _b.sent();
                    console.error(e_4);
                    res.status(500).json({
                        message: 'Error updating Member with id ' + req.params.memberId
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.updateMember = updateMember;
// Delete a Member with the specified memberId in the request
function deleteMember(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, result, _, e_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db_1.default.query('DELETE FROM member_list WHERE id = ?', [req.params.student_id])];
                case 1:
                    _a = _b.sent(), result = _a[0], _ = _a[1];
                    console.log('deleted member with id: ', req.params.student_id);
                    if (result.affectedRows == 0) {
                        // not found Member with the id
                        res.status(404).send({
                            message: "Not found Member with id " + req.params.memberId + "."
                        });
                        return [2 /*return*/];
                    }
                    res.status(200).json({ message: "Member(id: " + req.params.memberId + ") was deleted successfully!" });
                    return [2 /*return*/];
                case 2:
                    e_5 = _b.sent();
                    console.error(e_5);
                    res.status(500).send({
                        message: 'Could not delete Member with id ' + req.params.memberId
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.deleteMember = deleteMember;
// Delete all Members from the database.
function deleteAllMembers(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, result, _, e_6;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db_1.default.execute('TRUNCATE TABLE member_list')];
                case 1:
                    _a = _b.sent(), result = _a[0], _ = _a[1];
                    console.log("Deleted " + result.affectedRows + " members");
                    res.status(200).json({
                        message: 'All Members were deleted successfully!'
                    });
                    return [3 /*break*/, 3];
                case 2:
                    e_6 = _b.sent();
                    console.error(e_6);
                    res.status(500).json({
                        message: e_6.message || 'Some error occurred while removing all members.'
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.deleteAllMembers = deleteAllMembers;
