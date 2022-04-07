import { MeetingStepTypes } from '@shared/meetingStep'
import * as express from 'express'
import { collections } from '../../firebase'

export const migration: express.RequestHandler = async (req, res) => {
  const meetings = await collections.meetings.get()
  meetings.forEach(async (meetingDoc) => {
    // Get Tasks steps
    const steps = await meetingDoc.ref
      .collection('steps')
      .where('type', '==', MeetingStepTypes.Tasks)
      .get()
    steps.forEach(async (stepDoc) => {
      const step = stepDoc.data()
      if (step.tasksIds) return
      // Add empty tasksIds property to step
      await stepDoc.ref.update({
        tasksIds: [],
      })
    })
  })

  res.send('ok')
}
