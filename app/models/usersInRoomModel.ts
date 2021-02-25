/* eslint-disable no-unused-vars */
import mysql from '../database/db'

const TABLENAME = 'users_in_room'

const createUser = async (userId: number) => {
  try {
    await mysql.beginTransaction()
    await mysql.query(
      `INSERT INTO ${TABLENAME} (user_id) VALUES (?)`, userId)
    await mysql.commit()
    return 0
  } catch (error) {
    return error
  }
}

const deleteUser = async (userId: number) => {
  try {
    await mysql.beginTransaction()
    await mysql.query(`DELETE FROM ${TABLENAME}` + 'WHERE user_id=?', userId)
    await mysql.commit()
    return 0
  } catch (error) {
    return error
  }
}

const readUser = async (userId: number) => {
  try {
    const [row, _] = await mysql.query(
      `SELECT * FROM ${TABLENAME} WHERE user_id=?`, userId)
    return [Array.isArray(row) ? row[0] : row, null]
  } catch (error) {
    return [null, error]
  }
}

const readUsers = async () => {
  try {
    const [row, _] = await mysql.query(`SELECT * FROM ${TABLENAME}`)
    return [row, null]
  } catch (error) {
    return [null, error]
  }
}

export { createUser, deleteUser, readUser, readUsers }
