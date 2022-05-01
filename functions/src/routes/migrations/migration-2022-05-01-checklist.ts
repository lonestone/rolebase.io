import * as express from 'express'
import { collections } from '../../firebase'

export const migration: express.RequestHandler = async (req, res) => {
  const roles = await collections.roles.get()
  roles.forEach(async (roleDoc) => {
    const role = roleDoc.data()
    if (
      typeof role.checklist === 'string' &&
      typeof role.indicators === 'string'
    ) {
      return
    }
    // Add empty tasksIds property to step
    await roleDoc.ref.update({
      checklist: '',
      indicators: '',
    })
  })

  res.send('checklist and indicators added to roles')
}
