import mysql from '../database/db' // Connection

// constructor
// const Member = function(member) {
//   this.id = member.id
//   this.name = member.name
//   this.grade = member.grade
//   this.is_holder = member.is_holder
// }

export default interface Member {
  id: number
  name: string
  grade?: number
  is_holder?: boolean
}
