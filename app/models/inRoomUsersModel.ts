/* eslint-disable no-unused-vars */
import mysql from '../database/db'

const TABLENAME = 'in_room_users'

type InRoomUser = {
  'user_id': number,
  'entered_at': Date
}

async function createUser (userId: number) {
  // INSERT すると [ResultSetHeader, undefined] が返ってくる
  await mysql.query(`INSERT INTO ${TABLENAME} (user_id) VALUES (?)`, userId)
}

async function deleteUser (userId: number) {
  // DELETE すると [ResultSetHeader, undefined] が返ってくる
  await mysql.query(`DELETE FROM ${TABLENAME} WHERE user_id=?`, userId)
}

async function getUser (userId: number) {
  const [row, _] = await mysql.query(`SELECT * FROM ${TABLENAME} WHERE user_id=?`, userId)
  if (Array.isArray(row) && row.length <= 1) {
    if (row.length === 0) {
      return null
    // Array.isArray(row[0])はquery()が二次元配列を返すパターンがある。
    // このクエリ内容ならそれはあり得ないのだが念のため。
    // あり得ないので型アサーションで型を教えても問題ないといえばない。
    } else if (Array.isArray(row[0])) {
      throw new Error('response from DB is invalid')
    // user_idはこのテーブルの主キーなので0でないとすれば必ず1なのだが一応。
    } else if (row.length === 1) {
      return row[0] as InRoomUser
    }
  }

  throw new Error('response from DB is invalid')
}

async function listUsers () {
  const [rows, _] = await mysql.query(`SELECT * FROM ${TABLENAME}`)
  if (Array.isArray(rows)) {
    return rows as InRoomUser[]
  }

  throw new Error('response from DB is not an array')
}

export { createUser, deleteUser, getUser, listUsers }
