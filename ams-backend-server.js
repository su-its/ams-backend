"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express")); // avoiding TS1259
var bodyParser = __importStar(require("body-parser"));
var accesslogRoutes_1 = __importDefault(require("./app/routes/accesslogRoutes"));
var membersRoutes_1 = __importDefault(require("./app/routes/membersRoutes"));
require('dotenv').config(require('path').resolve(process.cwd(), '.env'));
var app = express_1.default();
// app.set('query parser', 'extended') // default value: 'extended'
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// simple route
app.get('/', function (req, res) {
    res.json({ message: 'This is backend server.' });
});
// set middlewares
app.use('/api', accesslogRoutes_1.default, membersRoutes_1.default);
// set port, listen for requests
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("Server is running on port " + PORT + ".");
});
