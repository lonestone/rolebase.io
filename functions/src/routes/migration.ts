import * as express from 'express'
import { collections } from '../firebase'

// Migration script
// http://localhost:5001/roles-app-37879/us-central1/api/migration

export const migration: express.RequestHandler = async (req, res) => {
  const membersSnapshot = await collections.members.get()
  for (const memberDoc of membersSnapshot.docs) {
    await memberDoc.ref.update({ archived: false })
  }

  const circlesSnapshot = await collections.circles.get()
  for (const circleDoc of circlesSnapshot.docs) {
    await circleDoc.ref.update({ archived: false })
  }

  const rolesSnapshot = await collections.roles.get()
  for (const roleDoc of rolesSnapshot.docs) {
    await roleDoc.ref.update({ archived: false })
  }

  res.send('ok')
}
