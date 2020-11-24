const mysql = require('../database/db').promise()

const searchWithFilter = async (req) => {
  try {
    const [rows, fields] = await mysql.query('SELECT * FROM access_log WHERE student_id = ?', [req.studentId])
    // console.log(rows.info) // danger !!!!!
    if (rows.info === 0) {
      /* not found Member with the id */
      // return {err: 'not_found', data: null}
      console.log('no affectedRows was found')
      return rows
    }
    console.log(`accesslogs of ${studentId}: `, rows)
    return rows
  } catch (err) {
    console.error(err)
    return Promise.reject(new Error('fail'))
  }
}

const getAll = async () => {
  try {
    const [rows, _] = await mysql.query(
      'SELECT * FROM access_log ' +
      'ORDER BY entered_at DESC')
    console.log('accesslog: ', rows)
    return rows
  } catch (err) {
    console.error('error: ', err)
    return err
  }
}

const judgeAction = async (studentId) => {
  try {
    /* Uncomment lines below for safety. (??) */
    // const [rows, _] = await mysql.query(
    //   'SELECT student_id,entered_at FROM access_log ' +
    //   'WHERE student_id = ? AND exited_at IS NULL ' +
    //   'ORDER BY entered_at DESC LIMIT 1', [studentId])
    const [rows, _] = await mysql.query(
      'SELECT entered_at FROM access_log ' +
      'WHERE student_id = ? AND exited_at IS NULL', [studentId])

    // rows[0] means a set of { 'entered_at': 'yyyy-mm-dd hh-mm-dd' }
    /* rows.length is expected to be 0 or 1 */
    if (rows.length) {
      // console.log(`entered_at: ${rows[0].entered_at}`)
      await mysql.execute(
        'UPDATE access_log SET exited_at=NOW() ' +
        'WHERE student_id = ? AND entered_at = ?',
        [studentId, rows[0].entered_at])
      return 'exit'
    } else {
      /* Wait for Promise<boolean> is resolved by using then() or await! */
      const result = await isMember(studentId)
      if (result) {
        await mysql.execute(
          'INSERT INTO access_log (student_id) VALUES (?)', [studentId])
        return 'enter'
      } else {
        return 'error'
      }
    }
  } catch (err) {
    console.error(err)
    return 'error1'
  }
}

async function isMember(studentId) {
  try {
    const [rows, _] = await mysql.query(
      'SELECT * FROM member_list ' +
      'WHERE id = ?', [studentId])
    if (rows.length) {
      return true
    } else {
      return false
    }
  } catch (err) {
    console.error(err)
    return false
  }
}
const countNinzu = async () => {
  try {
    const [rows, _] = await mysql.query(
      'SELECT COUNT(*) AS num FROM access_log ' +
      'WHERE exited_at IS NULL')
    console.log(`current num: ${rows[0].num}`)
    if (rows[0].num !== undefined) return rows[0].num
    else return rows.length
  } catch (err) {
    console.error(err)
    return -1
  }
}
module.exports = { getAll, searchWithFilter, judgeAction, countNinzu }