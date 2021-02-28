/* eslint-disable no-unused-vars */
import mysql from '../database/db'

const TABLENAME = 'access_logs'

const createAccessLog = async (userId: number, enteredAt: string) => {
  try {
    await mysql.query('INSERT INTO ? (user_id, entered_at)' +
      'VALUES (?, ?)', [TABLENAME, userId, enteredAt])
    return 0
  } catch (error) {
    return error
  }
}

const listAccessLogs = async (
  since?: string, until?: string,
  order = 'ASC', limit = 100, offset = 0
) => {
  try {
    const [rows, _] = await mysql.query(
      `SELECT * FROM ${TABLENAME} ` +
      "WHERE exited_at >= IFNULL(?, '1970-01-01') " +
      'AND entered_at < IFNULL(?, ADDDATE(CURDATE(), 1)) ' +
      `ORDER BY entered_at ${order in ['ASC', 'DESC'] ? order : 'ASC'} ` +
      'LIMIT ? OFFSET ?',
      [since, until, limit, offset])
    return [rows, null]
  } catch (error) {
    return [null, error]
  }
}

export { createAccessLog, listAccessLogs }
