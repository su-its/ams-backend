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
exports.countNumOfPeople = exports.judgeAction = exports.searchWithFilter = exports.getAll = void 0;
var db_1 = __importDefault(require("../database/db"));
var searchWithFilter = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, rows, _, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.default.query('SELECT * FROM access_log WHERE student_id = ?', [req.student_id])
                    // console.log(rows.info) // danger !!!!!
                    // if (rows.info === 0) {
                    //   /* not found Member with the id */
                    //   // return {err: 'not_found', data: null}
                    //   console.log('no affectedRows was found')
                    //   return rows
                    // }
                    // console.log(`accesslogs of ${student_id}: `, rows)
                ];
            case 1:
                _a = _b.sent(), rows = _a[0], _ = _a[1];
                // console.log(rows.info) // danger !!!!!
                // if (rows.info === 0) {
                //   /* not found Member with the id */
                //   // return {err: 'not_found', data: null}
                //   console.log('no affectedRows was found')
                //   return rows
                // }
                // console.log(`accesslogs of ${student_id}: `, rows)
                return [2 /*return*/, rows];
            case 2:
                e_1 = _b.sent();
                console.error(e_1);
                return [2 /*return*/, Promise.reject(new Error('fail'))];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.searchWithFilter = searchWithFilter;
var getAll = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, rows, _, e_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.default.query('SELECT * FROM access_log ' +
                        'ORDER BY entered_at DESC')
                    // console.log('accesslog: ', rows)
                ];
            case 1:
                _a = _b.sent(), rows = _a[0], _ = _a[1];
                // console.log('accesslog: ', rows)
                return [2 /*return*/, { data: rows, error: null }];
            case 2:
                e_2 = _b.sent();
                console.error('error: ', e_2);
                return [2 /*return*/, { data: null, error: e_2 }];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAll = getAll;
var judgeAction = function (student_id) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, rows, _, result, e_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 8, , 9]);
                return [4 /*yield*/, db_1.default.query('SELECT entered_at FROM access_log ' +
                        'WHERE student_id = ? AND exited_at IS NULL', [student_id])
                    /* rows[0] means a set of { 'entered_at': 'yyyy-mm-dd hh-mm-dd' }
                       rows.length is expected to be 0 or 1 */
                ];
            case 1:
                _a = _b.sent(), rows = _a[0], _ = _a[1];
                if (!rows) return [3 /*break*/, 3];
                // console.log(`entered_at: ${rows[0].entered_at}`)
                return [4 /*yield*/, db_1.default.execute('UPDATE access_log SET exited_at=NOW() ' +
                        'WHERE student_id = ? AND entered_at = ?', [student_id, rows[0]])];
            case 2:
                // console.log(`entered_at: ${rows[0].entered_at}`)
                _b.sent();
                return [2 /*return*/, 'exit'];
            case 3: return [4 /*yield*/, isMember(student_id)];
            case 4:
                result = _b.sent();
                if (!result) return [3 /*break*/, 6];
                return [4 /*yield*/, db_1.default.execute('INSERT INTO access_log (student_id) VALUES (?)', [student_id])];
            case 5:
                _b.sent();
                return [2 /*return*/, 'enter'];
            case 6: return [2 /*return*/, 'Not a member'];
            case 7: return [3 /*break*/, 9];
            case 8:
                e_3 = _b.sent();
                console.error(e_3);
                return [2 /*return*/, 'syserror'];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.judgeAction = judgeAction;
function isMember(student_id) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, rows, _, e_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db_1.default.query('SELECT * FROM member_list ' +
                            'WHERE id = ?', [student_id])];
                case 1:
                    _a = _b.sent(), rows = _a[0], _ = _a[1];
                    if (rows.length) {
                        return [2 /*return*/, true];
                    }
                    else {
                        return [2 /*return*/, false];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    e_4 = _b.sent();
                    console.error(e_4);
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    });
}
var countNumOfPeople = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, rows, _, e_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.default.query('SELECT COUNT(*) AS num FROM access_log ' +
                        'WHERE exited_at IS NULL')
                    // console.log(`Now ${rows[0].num} in the room.`)
                ];
            case 1:
                _a = _b.sent(), rows = _a[0], _ = _a[1];
                // console.log(`Now ${rows[0].num} in the room.`)
                if (rows[0].fieldCount !== undefined)
                    return [2 /*return*/, parseInt(rows[0].fieldCount)];
                else
                    return [2 /*return*/, -1];
                return [3 /*break*/, 3];
            case 2:
                e_5 = _b.sent();
                console.error(e_5);
                return [2 /*return*/, -1];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.countNumOfPeople = countNumOfPeople;
