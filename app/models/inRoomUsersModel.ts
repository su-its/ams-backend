/* eslint-disable no-unused-vars */
import mysql from '../database/db'

const TABLENAME = 'in_room_users'

async function createUser (userId: number) {
  try {
    // INSERT すると [ResultSetHeader, undefined] が返ってくる
    await mysql.query(`INSERT INTO ${TABLENAME} (user_id) VALUES (?)`, userId)
    return [0, null]
  } catch (err) {
    return [null, err]
  }
}

async function deleteUser (userId: number) {
  try {
    // DELETE すると [ResultSetHeader, undefined] が返ってくる
    await mysql.query(`DELETE FROM ${TABLENAME} WHERE user_id=?`, userId)
    return [0, null]
  } catch (err) {
    return [null, err]
  }
}

async function getUser (userId: number) {
  try {
    const [row, _] = await mysql.query(`SELECT * FROM ${TABLENAME} WHERE user_id=?`, userId)
    if (Array.isArray(row) && row.length !== 0) {
      return [row[0], null]
    } else {
      return [null, null]
    }
  } catch (err) {
    return [null, err]
  }
}

async function listUsers () {
  try {
    const [row, _] = await mysql.query(`SELECT * FROM ${TABLENAME}`)
    return [row, null]
  } catch (err) {
    return [null, err]
  }
}

export { createUser, deleteUser, getUser, listUsers }
