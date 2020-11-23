const mysql = require('../database/db').promise()

const searchWithFilter = async (req) => {
  try {
    const [rows, fields] = await mysql.query('SELECT * FROM access_log WHERE student_id = ?', [req.studentId])
    console.log(rows.info)
    if (rows.info === 0) {
      // not found Member with the id
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

// const findById = (studentId) => {
//   mysql.query('SELECT * FROM access_log WHERE student_id = ?', studentId)
//   .then(function fullfilled(rows, fileds) {
//     console.log(rows.affectedRows)
//     if (rows.affectedRows === 0) {
//       return 'err'
//     } else return rows
//   }, function rejected(reason) {console.log(reason)})
// }

const getAll = async () => {
  try {
    const [rows, _] = await mysql.query('SELECT * FROM access_log')
    console.log('accesslog: ', rows)
    return rows
  } catch (err) {
    console.error('error: ', err)
    return err
  }
}

const judgeAction = async (studentId) => {
  let answer = ''
  console.log(studentId)
  try {
    // Uncomment lines below for safety. (??)
    // const [rows, _] = await mysql.query(
    //   'SELECT student_id,entered_at FROM access_log ' +
    //   'WHERE student_id = ? AND exited_at IS NULL ' +
    //   'ORDER BY entered_at DESC LIMIT 1', [studentId])
    const [rows, _] = await mysql.query(
      'SELECT entered_at FROM access_log ' +
      'WHERE student_id = ? AND exited_at IS NULL', [studentId])
    console.log(rows.length)

    if (rows.length) {
      answer = 'exit'
      // console.log(`entered_at: ${rows[0].entered_at}`)
      await mysql.execute(
        'UPDATE access_log SET exited_at=NOW() ' +
        'WHERE student_id = ? AND entered_at = ?',
        [studentId, rows[0].entered_at])
    } else {
      answer = 'error'
      // Wait for Promise<boolean> is resolved by using then() or await!
      isMember(studentId)
      .then(async (result) => {
        console.log(result)
        if (result) {
          answer = 'enter'
          console.log('enter section')
          await mysql.execute(
            'INSERT INTO access_log (student_id) VALUES (?)', [studentId])
        }
      }).catch(console.error)
    }
    return answer
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

module.exports = { getAll, searchWithFilter, judgeAction }