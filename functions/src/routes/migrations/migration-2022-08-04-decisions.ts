import { ActivityBase, ActivityType } from '@shared/model/activity'
import * as express from 'express'
import { firestore } from 'firebase-admin'
import { collections } from '../../firebase'

interface ActivityDecision extends ActivityBase {
  type: ActivityType.Decision
  circleId: string
  decision: string
  explanation: string
}

export const migration: express.RequestHandler = async (req, res) => {
  // Get activities of type "Decision"
  const activities = await collections.activities
    .where('type', '==', ActivityType.Decision)
    .get()
  activities.forEach(async (activityDoc) => {
    const activity = activityDoc.data() as any as ActivityDecision
    if (activity.circleId !== undefined) {
      // Add decision
      const decisionDoc = await collections.decisions.add({
        orgId: activity.orgId,
        circleId: activity.circleId,
        memberId: activity.userId,
        title: activity.decision,
        description: activity.explanation,
        archived: false,
        createdAt: activity.createdAt,
      })
      // Update activity
      activityDoc.ref.update({
        entityId: decisionDoc.id,
        circleId: firestore.FieldValue.delete(),
        decision: firestore.FieldValue.delete(),
        explanation: firestore.FieldValue.delete(),
      })
    }
  })

  res.send('decisions migrated!')
}
