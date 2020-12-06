import mysql from '../database/db'

const searchWithFilter = async (req: {studentId: number}) => {
  try {
    const [rows, _] = await mysql.query(
      'SELECT * FROM access_log WHERE student_id = ?', [req.studentId])
    // console.log(rows.info) // danger !!!!!
    // if (rows.info === 0) {
    //   /* not found Member with the id */
    //   // return {err: 'not_found', data: null}
    //   console.log('no affectedRows was found')
    //   return rows
    // }
    // console.log(`accesslogs of ${student_id}: `, rows)
    return rows
  } catch (e) {
    console.error(e)
    return Promise.reject(new Error('fail'))
  }
}

const getAll = async () => {
  try {
    const [rows, _] = await mysql.query(
      'SELECT * FROM access_log ' +
      'ORDER BY entered_at DESC')
    // console.log('accesslog: ', rows)
    return { data: rows, error: null }
  } catch (e) {
    console.error('error: ', e)
    return { data: null, error: e }
  }
}

const judgeAction = async (studentId: number) => {
  try {
    const [rows, _] = await mysql.query(
      'SELECT entered_at FROM access_log ' +
      'WHERE student_id = ? AND exited_at IS NULL', [studentId])

    /* rows[0] means a set of { 'entered_at': 'yyyy-mm-dd hh-mm-dd' }
       rows.length is expected to be 0 or 1 */
    if (rows) {
      // console.log(`entered_at: ${rows[0].entered_at}`)
      await mysql.execute(
        'UPDATE access_log SET exited_at=NOW() ' +
        'WHERE student_id = ? AND entered_at = ?',
        [studentId, (rows as any)[0]])
      return 'exit'
    } else {
      /* Wait for Promise<boolean> is resolved by using `then()` or `await`! */
      const result = await isMember(studentId)
      if (result) {
        await mysql.execute(
          'INSERT INTO access_log (student_id) VALUES (?)', [studentId])
        return 'enter'
      } else {
        return 'Not a member'
      }
    }
  } catch (e) {
    console.error(e)
    return 'syserror'
  }
}

async function isMember(studentId: number) {
  try {
    const [rows, _] = await mysql.query(
      'SELECT * FROM member_list ' +
      'WHERE id = ?', [studentId])
    if ((rows as any).length) { return true }
    else { return false }
  } catch (e) {
    console.error(e)
    return false
  }
}

const countNumOfPeople = async () => {
  try {
    const [rows, _] = await mysql.query(
      'SELECT COUNT(*) AS num FROM access_log ' +
      'WHERE exited_at IS NULL')
    // console.log(`Now ${rows[0].num} in the room.`)
    if ((rows as any)[0].fieldCount !== undefined) return parseInt((rows as any)[0].fieldCount)
    else return -1
  } catch (e) {
    console.error(e)
    return -1
  }
}

export { getAll, searchWithFilter, judgeAction, countNumOfPeople }
