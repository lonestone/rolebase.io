import * as express from 'express'
import * as admin from 'firebase-admin'
import { collections } from '../../firebase'

export const migration: express.RequestHandler = async (req, res) => {
  // Add createdAt property to orgs
  const orgs = await collections.orgs.get()
  orgs.forEach(async (orgDoc) => {
    const org = orgDoc.data()
    if (typeof org.createdAt !== 'undefined') return
    await orgDoc.ref.update({
      createdAt: admin.firestore.Timestamp.now(),
    })
  })

  res.send('createdAt property added to orgs')
}
