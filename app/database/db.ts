import { dbOptions } from '../../config'
import { createConnection } from 'mysql2'

const connection = createConnection(dbOptions).promise()

export { connection }
