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

const judgeActionAndSetRecord = async (student_id: number, allow_guest: string) => {
  try {
    const [rows, _] = await mysql.query(
      'SELECT entered_at FROM access_log ' +
      'WHERE student_id = ? AND exited_at IS NULL ' +
      'ORDER BY entered_at DESC', [student_id])

    /*
     * rows[0] means a set of { 'entered_at': 'yyyy-mm-dd hh-mm-dd' }
     * rows.length is expected to be 0 or 1
     */
    if ((rows as any).length) {
      // console.log(`entered_at: ${rows[0].entered_at}`)
      await updateLog(student_id, (rows as any)[0].entered_at)
      return 'exit'
    } else {
      if (allow_guest !== 'on') {
        /* Wait for Promise<boolean> is resolved by using `await`! */
        const result = await isMember(student_id)
        if (!result) return 'Not a member'
      }
      insertLog(student_id)
      return 'enter'
    }
  } catch (e) {
    console.error(e)
    return 'syserror'
  }
}

const insertLog = async (student_id: number) => {
  try {
    await mysql.execute(
      'INSERT INTO access_log (student_id) VALUES (?)',
      [student_id])
  } catch (e) {
    console.error(e)
  }
}

const updateLog = async (student_id: number, entered_at: string) => {
  try {
    await mysql.execute(
      'UPDATE access_log SET exited_at=NOW() ' +
      'WHERE student_id = ? AND entered_at = ?',
      [student_id, entered_at])
  } catch (e) {
    console.error(e)
  }
}

const isMember = async (student_id: number) => {
  try {
    const [rows, _] = await mysql.query(
      'SELECT * FROM member_list ' +
      'WHERE id = ?', [student_id])
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
