/* eslint-disable no-unused-vars */
import mysql from '../database/db'

const TABLENAME = 'in_room_users'

async function createUser (userId: number) {
  try {
    await mysql.query(`INSERT INTO ${TABLENAME} (user_id) VALUES (?)`, userId)
    return 0
  } catch (error) {
    return error
  }
}

async function deleteUser (userId: number) {
  try {
    await mysql.query(`DELETE FROM ${TABLENAME} WHERE user_id=?`, userId)
    return 0
  } catch (error) {
    return error
  }
}

async function getUser (userId: number) {
  try {
    const [row, _] = await mysql.query(`SELECT * FROM ${TABLENAME} WHERE user_id=?`, userId)
    if (Array.isArray(row) && row.length !== 0) return [row[0], null]
    else return [null, null]
  } catch (error) {
    return [null, error]
  }
}

async function listUsers () {
  try {
    const [row, _] = await mysql.query(`SELECT * FROM ${TABLENAME}`)
    return [row, null]
  } catch (error) {
    return [null, error]
  }
}

export { createUser, deleteUser, getUser, listUsers }
