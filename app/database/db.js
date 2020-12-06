"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// user environment variable
require('dotenv').config({ path: require('path').resolve(process.cwd(), '.env') });
var mysql2_1 = require("mysql2");
var connection = mysql2_1.createConnection({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB,
    waitForConnections: true
}).promise();
exports.default = connection;
