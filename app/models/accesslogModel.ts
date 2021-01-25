import mysql from '../database/db'

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

const judgeActionAndSetRecord = async (studentId: number, acceptGuest: boolean) => {
  try {
    const [rows, _] = await mysql.query(
      'SELECT entered_at FROM access_log ' +
      'WHERE student_id = ? AND exited_at IS NULL ' +
      'ORDER BY entered_at DESC', [studentId])

    /*
     * rows[0] means a set of { 'entered_at': 'yyyy-mm-dd hh-mm-dd' }
     * rows.length is expected to be 0 or 1
     */
    if ((rows as any).length) {
      // console.log(`entered_at: ${rows[0].entered_at}`)
      await updateRecord(studentId, (rows as any)[0].entered_at)
      return 'exit'
    } else {
      if (acceptGuest) {
        /* Wait for Promise<boolean> is resolved by using `await`! */
        const result = await isMember(studentId)
        if (!result) return 'Not a member'
      }
      await insertRecord(studentId)
      return 'enter'
    }
  } catch (e) {
    console.error(e)
    return 'syserror'
  }
}

const insertRecord = async (studentId: number) => {
  try {
    await mysql.execute(
      'INSERT INTO access_log (student_id) VALUES (?)',
      [studentId])
  } catch (e) {
    console.error(e)
  }
}

const updateRecord = async (studentId: number, enteredAt: string) => {
  try {
    await mysql.execute(
      'UPDATE access_log SET exited_at=NOW() ' +
      'WHERE student_id = ? AND entered_at = ?',
      [studentId, enteredAt])
  } catch (e) {
    console.error(e)
  }
}

const isMember = async (studentId: number) => {
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
      'SELECT COUNT(1) AS num FROM access_log ' +
      'WHERE exited_at IS NULL')
    // console.log(`Now ${rows[0].num} in the room.`)
    if ((rows as any)[0].num !== undefined) return parseInt((rows as any)[0].num)
    else return -1
  } catch (e) {
    console.error(e)
    return -1
  }
}

export { countNumOfPeople, getAll, judgeActionAndSetRecord }
