// user environment variable
import { resolve } from 'path'
import { config } from 'dotenv'
import { createConnection } from 'mysql2'

config({ path: resolve(process.cwd(), '.env')})

const connection = createConnection({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306', 10),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB,
  waitForConnections: true
}).promise()

export default connection
