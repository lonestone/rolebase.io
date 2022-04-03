import { TaskStatus } from '@shared/task'
import * as express from 'express'
import * as admin from 'firebase-admin'
import * as firestore from 'firebase-admin/firestore'

// Migration script
// http://localhost:5001/roles-app-37879/us-central1/api/migration

export const migration: express.RequestHandler = async (req, res) => {
  const querySnapshot = await admin.firestore().collection('tasks').get()

  querySnapshot.forEach((doc) => {
    const task = doc.data()
    if ('doneDate' in task || task.doneDate === undefined) return
    doc.ref
      .update({
        status: task.doneDate ? TaskStatus.Done : TaskStatus.Open,
        doneDate: firestore.FieldValue.delete(),
      })
      .catch((err) => {
        console.warn(err)
      })
  })
  res.send('ok')
}
