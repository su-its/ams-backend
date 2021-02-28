/* eslint-disable no-unused-vars */
import mysql from '../database/db'

const TABLENAME = 'in_room_users'

const createUser = async (userId: number) => {
  try {
    await mysql.beginTransaction()
    await mysql.query(`INSERT INTO ${TABLENAME} (user_id) VALUES (?)`, userId)
    await mysql.commit()
    return 0
  } catch (error) {
    return error
  }
}

const deleteUser = async (userId: number) => {
  try {
    await mysql.beginTransaction()
    await mysql.query(`DELETE FROM ${TABLENAME} WHERE user_id=?`, userId)
    await mysql.commit()
    return 0
  } catch (error) {
    return error
  }
}

const getUser = async (userId: number) => {
  try {
    const [row, _] = await mysql.query(`SELECT * FROM ${TABLENAME} WHERE user_id=?`, userId)
    if (Array.isArray(row) && row.length !== 0) return [row[0], null]
    else return [null, null]
  } catch (error) {
    return [null, error]
  }
}

const listUsers = async () => {
  try {
    const [row, _] = await mysql.query(`SELECT * FROM ${TABLENAME}`)
    return [row, null]
  } catch (error) {
    return [null, error]
  }
}

export { createUser, deleteUser, getUser, listUsers }
