// user environment variable
require('dotenv').config(require('path').resolve(process.cwd(), '.env'))

const connection = require('mysql2').createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB,
  waitForConnections: true
})

module.exports = connection
