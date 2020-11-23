const sql = require('./db') // Connection

// exports.findById = function(memberId) {
//   return new Promise((resolve, reject) => {
//     sql.query(`SELECT * FROM access_log WHERE id = ${memberId}`, (err, res) => {
//       if (err) {
//         console.log('error: ', err)
//         reject(err, null)
//         return
//       }

//       if (res.length) {
//         console.log('found member: ', res)
//         resolve(null, res[0])
//         return
//       }

//       // not found Member with the id
//       resolve({ kind: 'not_found' }, null)
//     })
//   })
// }

exports.findById = function(memberId, result) {
  sql.query(`SELECT * FROM member_list WHERE id = ${memberId}`, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }

    if (res.length) {
      console.log('found member: ', res)
      result(null, res[0])
      return
    }

    // not found Member with the id
    result({ kind: 'not_found' }, null)
  })
}

exports.getAll = function(result) {
  sql.query('SELECT * FROM access_log', (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
      return
    }

    console.log('accesslog: ', res)
    result(null, res)
  })
}
