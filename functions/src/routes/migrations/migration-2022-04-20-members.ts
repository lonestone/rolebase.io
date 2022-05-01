import * as express from 'express'
import { collections } from '../../firebase'

export const migration: express.RequestHandler = async (req, res) => {
  const members = await collections.members.get()
  members.forEach(async (memberDoc) => {
    const member = memberDoc.data()
    if (typeof member.description === 'string') return
    // Add empty tasksIds property to step
    await memberDoc.ref.update({
      description: '',
    })
  })

  res.send('description added to members')
}
