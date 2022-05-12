import { executeQuery } from '@api/helpers/executeQuery'
import { getEntityMethods } from '@api/helpers/getEntityMethods'
import { getSubCollection } from '@api/helpers/getSubCollection'
import { subscribeQuery } from '@api/helpers/subscribeQuery'
import { MeetingEntry, MeetingStepConfig } from '@shared/model/meeting'
import { MeetingStep, MeetingStepTypes } from '@shared/model/meetingStep'
import { doc } from 'firebase/firestore'
import { memoize } from 'src/memoize'
import { collection as meetingsCollection } from './meetings'

export const meetingStepsEntities = memoize((meetingId: string) => {
  const collection = getSubCollection<MeetingStep>(
    doc(meetingsCollection, meetingId),
    'steps'
  )

  const methods = getEntityMethods(collection)
  return {
    createMeetingStep: methods.create,
    updateMeetingStep: methods.update,
    deleteMeetingStep: methods.delete,
    subscribeMeetingSteps: memoize(() => subscribeQuery(collection)),
    getMeetingSteps: () => executeQuery(collection),
  }
})

export function getDefaultMeetingStep(type: MeetingStepTypes): MeetingStep {
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
}

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
      createMeetingStep(getDefaultMeetingStep(stepConfig.type), stepConfig.id)
    )
  )
}

// Duplicate steps content from a meeting to a newly created meeting
// that can have different stepsConfig.
// We use id to match steps that can be duplicated.
export async function duplicateMeetingSteps(
  fromMeetingId: string,
  toMeeting: MeetingEntry
) {
  const { getMeetingSteps } = meetingStepsEntities(fromMeetingId)
  const { createMeetingStep } = meetingStepsEntities(toMeeting.id)
  const meetingSteps = await getMeetingSteps()

  await Promise.all(
    meetingSteps
      .filter((step) =>
        toMeeting.stepsConfig.some((stepConfig) => stepConfig.id === step.id)
      )
      .map((step) => {
        const { id, ...stepWithoutId } = step
        return createMeetingStep(stepWithoutId, id)
      })
  )
}
