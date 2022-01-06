import { Meeting, MeetingEntry } from '@shared/meeting'
import { Optional } from '@shared/types'
import { memoize } from 'src/memoize'
import settings from 'src/settings'
import {
  getCollection,
  getEntityMethods,
  subscribeQuery,
  Timestamp,
} from '../firebase'
import { meetingStepsEntities } from './meetingSteps'

export const collection = getCollection<Meeting>('meetings')

const methods = getEntityMethods(collection, {
  createTransform: (
    meeting: Optional<Meeting, 'createdAt' | 'ended' | 'currentStepId'>
  ) => ({
    ...meeting,
    ended: false,
    currentStepId: null,
    createdAt: Timestamp.now(),
  }),
})
export const getMeeting = methods.get
export const createMeeting = methods.create
export const updateMeeting = methods.update
export const subscribeMeeting = methods.subscribe

export const deleteMeeting = async (id: string) => {
  const { getMeetingSteps, deleteMeetingStep } = meetingStepsEntities(id)
  const meetingSteps = await getMeetingSteps()
  await Promise.all(meetingSteps.map((step) => deleteMeetingStep(step.id)))
  await methods.delete(id)
}

export const subscribeMeetingsByDates = memoize(
  (orgId: string, fromDate: Date, toDate: Date) =>
    subscribeQuery(
      collection
        .where('orgId', '==', orgId)
        .where('startDate', '>=', fromDate)
        .where('startDate', '<', Timestamp.fromDate(toDate))
    )
)

export const subscribeMeetingsByCircle = memoize(
  (orgId: string, circleId: string, ended: boolean) =>
    subscribeQuery(
      collection
        .where('orgId', '==', orgId)
        .where('circleId', '==', circleId)
        .where('ended', '==', ended)
        .orderBy('startDate', 'desc')
    )
)

export function updateMeetingDates(id: string, startDate: Date, endDate: Date) {
  updateMeeting(id, {
    startDate: Timestamp.fromDate(startDate),
    endDate: Timestamp.fromDate(endDate),
  })
}

export async function goToNextMeetingStep(meeting: MeetingEntry) {
  if (!meeting) return

  // Meeting not started
  if (meeting.currentStepId === null) {
    const firstStep = meeting.stepsConfig[0]
    if (firstStep) {
      // Go to first step
      await updateMeeting(meeting.id, {
        currentStepId: firstStep.id,
        ended: false,
      })
    } else {
      // No first step, end meeting
      await updateMeeting(meeting.id, {
        currentStepId: null,
        ended: true,
      })
    }
    return
  }

  // Find current and next step
  const currentStepIndex = meeting.stepsConfig.findIndex(
    (step) => step.id === meeting.currentStepId
  )
  if (
    currentStepIndex !== -1 &&
    currentStepIndex < meeting.stepsConfig.length - 1
  ) {
    // Go to next step
    const nextStep = meeting.stepsConfig[currentStepIndex + 1]
    await updateMeeting(meeting.id, {
      currentStepId: nextStep.id,
    })
  } else {
    // End meeting
    await updateMeeting(meeting.id, {
      currentStepId: null,
      ended: true,
    })
  }
}

export function getMeetingsIcalUrl(orgId: string | undefined) {
  return `${settings.firebaseFunctionsUrl}api/meetings.ics?orgId=${orgId}`
}
