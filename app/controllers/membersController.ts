import { Request, Response } from 'express'
import Member from '../models/membersModel'
import mysql from '../database/db'
import { RowDataPacket } from 'mysql2'

// Create and Save a new Member
export async function createMember(req: Request, res: Response) {
  // Validate request
  if (!req.body) {
    res.status(400).json({
      message: 'Content can not be empty!'
    })
    return
  }

  // Create a Member
  const newMember: Member = req.body
  if (newMember.id === undefined || newMember.name === undefined) {
    res.status(400).json({
      message: 'id or name is empty.'
    })
    return
  }

  try {
    const [result, _] = await mysql.execute(
      'INSERT INTO member_list (id,name) VALUES (?,?)',
      [
        newMember.id, newMember.name
      ])
    res.status(201).send((result as any)[0])
    return
  } catch (e) {
    console.error(e)
    res.status(500).json({
      message:
        e.sqlMessage || 'Some error occurred while creating the Member.'
    })
    return
  }
}

// Retrieve all Members from the database.
export async function getAllMembers(req: Request, res: Response) {
  try {
    const [result, _] = await mysql.query('SELECT * FROM member_list')
    res.send(result)
    return
  } catch (e) {
    console.error('error: ', e)
    res.status(500).json({
      message: e.message || 'Some error occurred while retrieving members.'
    })
    return
  }
}

// Find a single Member with a member_id
export async function getMember(req: Request, res: Response) {
  try {
    const [result, _] = await mysql.execute('SELECT * FROM member_list WHERE id = ?',[req.params.member_id])
    if (!(result as any).length) {
      res.status(400).json({
        message: `Not found Member with id ${req.params.member_id}.`
      })
      return
    }
    console.log('found member: ', (result as any)[0])
    res.status(200).send(result)
    return
  } catch (e) {
    console.error(e)
    res.status(500).json({
      message: 'Error retrieving Member with id ' + req.params.member_id
    })
    return
  }
}

// Update a Member identified by the member_id in the request
export async function updateMember(req: Request, res: Response) {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!'
    })
  }
  console.log(req.body)
  try {
    const updatedMember: Member = req.body
    const [result, _] = await mysql.execute('UPDATE member_list SET ? WHERE id = ?',
      [
        updatedMember, req.params.member_id
      ])
    if ((result as any).affectedRows == 0) {
      res.status(404).json({
        message: `Not found Member with id ${req.params.member_id}.`
      })
    }
    console.log('updated member:', result)
    res.send(result)
  } catch (e) {
    console.error(e)
    res.status(500).json({
      message: 'Error updating Member with id ' + req.params.member_id
    })
  }
}

// Delete a Member with the specified member_id in the request
export async function deleteMember(req: Request, res: Response) {
  try {
    const [result, _] = await mysql.query('DELETE FROM member_list WHERE id = ?', [req.params.member_id])
    console.log('deleted member with id: ', req.params.member_id)
    if((result as any).affectedRows == 0) {
      // not found Member with the id
      res.status(404).send({
        message: `Not found Member with id ${req.params.member_id}.`
      })
      return
    }
    res.status(200).json({ message: `Member(id: ${req.params.member_id}) was deleted successfully!` })
    return
  } catch (e) {
    console.error(e)
    res.status(500).send({
      message: 'Could not delete Member with id ' + req.params.member_id
    })
  }
}

// Delete all Members from the database.
export async function deleteAllMembers(req: Request, res: Response) {
  try {
    const [result, _] = await mysql.execute('TRUNCATE TABLE member_list')
    console.log(`Deleted ${(result as any).affectedRows} members`)
    res.status(200).json({
      message: 'All Members were deleted successfully!'
    })
  } catch (e) {
    console.error(e)
    res.status(500).json({
      message:
        e.message || 'Some error occurred while removing all members.'
    })
  }
}
