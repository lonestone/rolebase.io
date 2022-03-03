import * as express from 'express'
import * as admin from 'firebase-admin'
// Migration script
// http://localhost:5001/roles-app-37879/us-central1/api/migration

export const migration: express.RequestHandler = async (req, res) => {
  const querySnapshot = await admin.firestore().collection('members').get()

  querySnapshot.forEach((doc) => {
    doc.ref.update({ meetingId: null }).catch((err) => {
      console.warn(err)
    })
  })
  res.send('ok')
}
