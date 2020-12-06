import mysql from '../database/db' // Connection

// constructor
// const Member = function(member) {
//   this.id = member.id
//   this.name = member.name
//   this.grade = member.grade
//   this.is_holder = member.is_holder
// }

export default class Member {
  private id: number
  private name: string
  private grade?: number
  private is_holder?: boolean

  constructor(id: number, name: string, grade?: number, is_holder?: boolean) {
    this.id = id
    this.name = name
    this.grade = grade
    this.is_holder = is_holder
  }

  public async create(newMember: Member) {
    try {
      const [res, _] = await mysql.execute(
        'INSERT INTO member_list (id,name,grade,is_holder) VALUES (?,?,?,?)',
        [
          newMember.id, newMember.name, newMember.grade, newMember.is_holder
        ])
      return {data: res, error: null}
    } catch (e) {
      console.error(e)
      return {data: null, error: e}
    }
  }

  public async findById(member_id: number) {
    try {
      const [res, _] = await mysql.execute(
        'SELECT * FROM member_list WHERE id = ?',[member_id])

      if (res.constructor.name.length) {
        console.log('found member: ', res[0])
        return {data: res, kind: 'found'}
      }
      return {data: null, kind: 'not found'}
    } catch (e) {
      console.error(e)
      return {data: null, error: e}
    }
  }
}
