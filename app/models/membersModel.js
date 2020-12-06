"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var db_1 = __importDefault(require("../database/db")); // Connection
// constructor
// const Member = function(member) {
//   this.id = member.id
//   this.name = member.name
//   this.grade = member.grade
//   this.is_holder = member.is_holder
// }
var Member = /** @class */ (function () {
    function Member(id, name, grade, is_holder) {
        this.id = id;
        this.name = name;
        this.grade = grade;
        this.is_holder = is_holder;
    }
    Member.prototype.create = function (newMember) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, res, _, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_1.default.execute('INSERT INTO member_list (id,name,grade,is_holder) VALUES (?,?,?,?)', [
                                newMember.id, newMember.name, newMember.grade, newMember.is_holder
                            ])];
                    case 1:
                        _a = _b.sent(), res = _a[0], _ = _a[1];
                        return [2 /*return*/, { data: res, error: null }];
                    case 2:
                        e_1 = _b.sent();
                        console.error(e_1);
                        return [2 /*return*/, { data: null, error: e_1 }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Member.prototype.findById = function (member_id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, res, _, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_1.default.execute('SELECT * FROM member_list WHERE id = ?', [member_id])];
                    case 1:
                        _a = _b.sent(), res = _a[0], _ = _a[1];
                        if (res.constructor.name.length) {
                            console.log('found member: ', res[0]);
                            return [2 /*return*/, { data: res, kind: 'found' }];
                        }
                        return [2 /*return*/, { data: null, kind: 'not found' }];
                    case 2:
                        e_2 = _b.sent();
                        console.error(e_2);
                        return [2 /*return*/, { data: null, error: e_2 }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Member;
}());
Member.findById = function (memberId, result) {
    sql.query("SELECT * FROM member_list WHERE id = " + memberId, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log('found member: ', res[0]);
            result(null, res[0]);
            return;
        }
        // not found Member with the id
        result({ kind: 'not_found' }, null);
    });
};
Member.getAll = function (result) {
    sql.query('SELECT * FROM member_list', function (err, res) {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }
        console.log('members: ', res);
        result(null, res);
    });
};
Member.updateById = function (id, member, result) {
    sql.query('UPDATE member_list SET name = ?, grade = ?, is_holder = ? WHERE id = ?', [member.name, member.grade, member.is_holder, id], function (err, res) {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            console.log('no affected rows');
            // not found Member with the id
            result({ kind: 'not_found' }, null);
            return;
        }
        console.log('updated member: ', __assign({ id: id }, member));
        result(null, __assign({ id: id }, member));
    });
};
Member.remove = function (id, result) {
    sql.query('DELETE FROM member_list WHERE id = ?', id, function (err, res) {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found Member with the id
            result({ kind: 'not_found' }, null);
            return;
        }
        console.log('deleted member with id: ', id);
        result(null, res);
    });
};
Member.removeAll = function (result) {
    sql.query('DELETE FROM member_list', function (err, res) {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }
        console.log("deleted " + res.affectedRows + " members");
        result(null, res);
    });
};
exports.default = Member;
