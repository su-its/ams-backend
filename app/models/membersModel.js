const sql = require('../database/db') // Connection
const mysql = require('../database/db').promise()

// constructor
const Member = function(member) {
  this.id = member.id
  this.name = member.name
  this.grade = member.grade
  this.is_holder = member.is_holder
}

Member.create = async (newMember) => {
  try {
    const [res, _] = await mysql.execute(
      'INSERT INTO member_list (id,name,grade,is_holder) VALUES (?,?,?,?)',
      [
        newMember.id, newMember.name, newMember.grade, newMember.is_holder
      ])
    console.log('==RawDatapacket[][]==')
    for (const key in res) {
      if (res.hasOwnProperty(key)) {
        console.log(res[key])
      }
    }
    console.log('==FieldPacket[]==')
    for (const key in _) {
      if (_.hasOwnProperty(key)) {
        console.log(_[key])
      }
    }
    return {data: res, error: null}
    console.log(typeof newMember)
    sql.query('INSERT INTO member_list SET ?', newMember, (err, res) => {
      //console.log('affectedRows: ', res.affectedRows)
      if (err) {
        //console.log('error: ', err)
        //result(err, null)
        //return
        return {data: null, error: err}
      }
      console.log('created member: ', { id: res.insertId, ...newMember })
      return {data: res, error: null}
      result(null, { id: res.insertId, ...newMember })
    })
  } catch (e) {
    console.error(e)
    return {data: null, error: e}
  }
}

Member.findById = (memberId, result) => {
  sql.query(`SELECT * FROM member_list WHERE id = ${memberId}`, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    if (res.length) {
      console.log('found member: ', res[0])
      result(null, res[0])
      return
    }

    // not found Member with the id
    result({ kind: 'not_found' }, null)
  })
}

Member.getAll = result => {
  sql.query('SELECT * FROM member_list', (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
      return
    }

    console.log('members: ', res)
    result(null, res)
  })
}

Member.updateById = (id, member, result) => {
  sql.query(
    'UPDATE member_list SET name = ?, grade = ?, is_holder = ? WHERE id = ?',
    [member.name, member.grade, member.is_holder, id],
    (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(null, err)
        return
      }

      if (res.affectedRows == 0) {
        console.log('no affected rows')
        // not found Member with the id
        result({ kind: 'not_found' }, null)
        return
      }

      console.log('updated member: ', { id: id, ...member })
      result(null, { id: id, ...member })
    }
  )
}

Member.remove = (id, result) => {
  sql.query('DELETE FROM member_list WHERE id = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
      return
    }

    if (res.affectedRows == 0) {
      // not found Member with the id
      result({ kind: 'not_found' }, null)
      return
    }

    console.log('deleted member with id: ', id)
    result(null, res)
  })
}

Member.removeAll = result => {
  sql.query('DELETE FROM member_list', (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
      return
    }

    console.log(`deleted ${res.affectedRows} members`)
    result(null, res)
  })
}

module.exports = Member
