import { MeetingStepConfig } from '@shared/meeting'
import { MeetingStep, MeetingStepTypes } from '@shared/meetingStep'
import { doc } from 'firebase/firestore'
import { memoize } from 'src/memoize'
import {
  executeQuery,
  getEntityMethods,
  getSubCollection,
  subscribeQuery,
} from '../firebase'
import { collection as meetingsCollection } from './meetings'

export const meetingStepsEntities = memoize((meetingId: string) => {
  const collection = getSubCollection<MeetingStep>(
    doc(meetingsCollection, meetingId),
    'steps'
  )

  const methods = getEntityMethods(collection, {
    createTransform: (type: MeetingStepTypes) => {
      switch (type) {
        case MeetingStepTypes.Tour:
          return {
            type,
            notes: '',
            participants: [],
            currentMemberId: '',
          }
        case MeetingStepTypes.Threads:
          return {
            type,
            notes: '',
            threadsIds: [],
          }
        case MeetingStepTypes.Tasks:
          return {
            type,
            notes: '',
            tasksIds: [],
          }
        case MeetingStepTypes.Checklist:
        case MeetingStepTypes.Indicators:
          return {
            type,
            notes: '',
          }
      }
    },
  })
  return {
    createMeetingStep: methods.create,
    updateMeetingStep: methods.update,
    deleteMeetingStep: methods.delete,
    subscribeMeetingSteps: memoize(() => subscribeQuery(collection)),
    getMeetingSteps: () => executeQuery(collection),
  }
})

// When a meeting is created, it has a stepsConfig property
// but it doesn't have any content in steps collection.
// So we need to create a step for each stepConfig after meeting edition
export async function createMissingMeetingSteps(
  meetingId: string,
  stepsConfig: MeetingStepConfig[]
) {
  const { getMeetingSteps, createMeetingStep } = meetingStepsEntities(meetingId)
  const meetingSteps = await getMeetingSteps()
  const missingSteps = stepsConfig.filter(
    (stepConfig) => !meetingSteps.find((step) => step.id === stepConfig.id)
  )

  await Promise.all(
    missingSteps.map((stepConfig) =>
      createMeetingStep(stepConfig.type, stepConfig.id)
    )
  )
}
