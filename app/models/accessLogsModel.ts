/* eslint-disable no-unused-vars */
import mysql from '../database/db'

const TABLENAME = 'access_logs'

async function createAccessLog (userId: number, enteredAt: string) {
  try {
    await mysql.query(`INSERT INTO ${TABLENAME} (user_id, entered_at) VALUES (?, ?)`,
      [userId, enteredAt])
    return 0
  } catch (error) {
    return error
  }
}

/**
 * access_logsの総行数を取得する
 */
async function getCountOfAccessLogs () {
  try {
    // https://stackoverflow.com/a/11412968
    const [rows, _] = await mysql.query(`SELECT count(*) AS logCount FROM ${TABLENAME}`)

    if (Array.isArray(rows) && rows.length === 1) {
      const row = rows[0]
      if ('logCount' in row) {
        return [row.logCount, null]
      }
    }

    return [null, 'response from DB is malformed']
  } catch (error) {
    return [null, error]
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
  } catch (error) {
    return [null, error]
  }
}

export { createAccessLog, getCountOfAccessLogs, listAccessLogs }
