import { ClaimRole, UserClaims } from '@shared/userClaims'
import * as express from 'express'
import { auth, collections } from '../firebase'

// Migration script
// http://localhost:5001/roles-app-37879/us-central1/api/migration

export const migration: express.RequestHandler = async (req, res) => {
  const usersClaims: Record<string, UserClaims> = {}

  const membersSnapshot = await collections.members.get()
  membersSnapshot.docs.forEach((memberDoc) => {
    const member = memberDoc.data()
    if (member.userId) {
      if (!usersClaims[member.userId]) {
        usersClaims[member.userId] = {}
      }
      const role = ClaimRole.Admin

      usersClaims[member.userId][`org-${member.orgId}`] = role
    }
  })

  for (const userId in usersClaims) {
    if (!usersClaims[userId]) continue
    auth.setCustomUserClaims(userId, usersClaims[userId])
  }

  res.send('ok')
}
