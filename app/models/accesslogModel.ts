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

const judgeAction = async (member_id: number) => {
  try {
    const [rows, _] = await mysql.query(
      'SELECT entered_at FROM access_log ' +
      'WHERE member_id = ? AND exited_at IS NULL', [member_id])

    /* rows[0] means a set of { 'entered_at': 'yyyy-mm-dd hh-mm-dd' }
       rows.length is expected to be 0 or 1 */
    if ((rows as any).length) {
      // console.log(`entered_at: ${rows[0].entered_at}`)
      await mysql.execute(
        'UPDATE access_log SET exited_at=NOW() ' +
        'WHERE member_id = ? AND entered_at = ?',
        [member_id, (rows as any)[0].entered_at])
      return 'exit'
    } else {
      /* Wait for Promise<boolean> is resolved by using `then()` or `await`! */
      const result = await isMember(member_id)
      if (result) {
        await mysql.execute(
          'INSERT INTO access_log (member_id) VALUES (?)', [member_id])
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

async function isMember(member_id: number) {
  try {
    const [rows, _] = await mysql.query(
      'SELECT * FROM member_list ' +
      'WHERE id = ?', [member_id])
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

export { getAll, judgeAction, countNumOfPeople }
