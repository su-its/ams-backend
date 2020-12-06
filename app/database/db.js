"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// user environment variable
var path_1 = require("path");
var dotenv_1 = require("dotenv");
var mysql2_1 = require("mysql2");
dotenv_1.config({ path: path_1.resolve(process.cwd(), '.env') });
var connection = mysql2_1.createConnection({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB,
    waitForConnections: true
}).promise();
exports.default = connection;
