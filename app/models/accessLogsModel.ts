/* eslint-disable no-unused-vars */
import mysql from '../database/db'

const TABLENAME = 'access_logs'

async function createAccessLog (userId: number, enteredAt: string) {
  try {
    // INSERT すると [ResultSetHeader, undefined] が返ってくる
    await mysql.query(`INSERT INTO ${TABLENAME} (user_id, entered_at) VALUES (?, ?)`,
      [userId, enteredAt])
    return [0, null]
  } catch (err) {
    return [null, err]
  }
}

async function listAccessLogs (
  since?: string, until?: string,
  order = 'DESC', limit = 100, offset = 0
) {
  try {
    const [rows, _] = await mysql.query(
      `SELECT * FROM ${TABLENAME} ` +
      "WHERE exited_at >= IFNULL(?, '1970-01-01') " +
      'AND entered_at < IFNULL(?, ADDDATE(CURDATE(), 1)) ' +
      `ORDER BY entered_at ${['ASC', 'DESC'].includes(order) ? order : 'DESC'} ` +
      'LIMIT ? OFFSET ?',
      [since, until, limit, offset])
    return [rows, null]
  } catch (err) {
    return [null, err]
  }
}

export { createAccessLog, listAccessLogs }
