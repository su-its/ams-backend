/* eslint-disable no-unused-vars */
import mysql from '../database/db'

const TABLENAME = 'access_logs'

async function createAccessLog (userId: number, enteredAt: string) {
  // INSERT すると [ResultSetHeader, undefined] が返ってくる
  await mysql.query(`INSERT INTO ${TABLENAME} (user_id, entered_at) VALUES (?, ?)`,
    [userId, enteredAt])
}

/**
 * access_logsの総行数を取得する
 */
async function getCountOfAccessLogs () {
  // https://stackoverflow.com/a/11412968
  const [rows, _] = await mysql.query(`SELECT count(*) AS logCount FROM ${TABLENAME}`)

  if (Array.isArray(rows) && rows.length === 1) {
    const row = rows[0]
    if ('logCount' in row) {
      // SQLの仕様からしてcount()の返り値は整数なのでアサーションしても問題ない
      return row.logCount as number
    }
  }

  throw new Error('response from DB is malformed')
}

async function listAccessLogs (
  since?: string, until?: string,
  order = 'DESC', limit = 100, offset = 0
) {
  const [rows, _] = await mysql.query(
    `SELECT * FROM ${TABLENAME} ` +
    "WHERE exited_at >= IFNULL(?, '1970-01-01') " +
    'AND entered_at < IFNULL(?, ADDDATE(CURDATE(), 1)) ' +
    `ORDER BY entered_at ${['ASC', 'DESC'].includes(order) ? order : 'DESC'} ` +
    'LIMIT ? OFFSET ?',
    [since, until, limit, offset])

  if (Array.isArray(rows)) {
    return rows
  }

  throw new Error('response from DB is malformed')
}

export { createAccessLog, getCountOfAccessLogs, listAccessLogs }
