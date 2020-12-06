// user environment variable
require('dotenv').config({ path: require('path').resolve(process.cwd(), '.env')})
import { createConnection } from 'mysql2'

const connection = createConnection({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306', 10),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB,
  waitForConnections: true
}).promise()

export default connection
