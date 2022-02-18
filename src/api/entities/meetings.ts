import { ParticipantMember } from '@hooks/useParticipants'
import { Meeting, MeetingEntry } from '@shared/meeting'
import { Optional } from '@shared/types'
import { orderBy, query, Timestamp, where } from 'firebase/firestore'
import { httpsCallable } from 'firebase/functions'
import { memoize } from 'src/memoize'
import settings from 'src/settings'
import {
  functions,
  getCollection,
  getEntityMethods,
  subscribeQuery,
} from '../firebase'
import { setInMeetingStatus } from './members'

export const collection = getCollection<Meeting>('meetings')

const methods = getEntityMethods(collection, {
  createTransform: (
    meeting: Optional<
      Meeting,
      'createdAt' | 'ended' | 'currentStepId' | 'archived'
    >
  ) => ({
    ended: false,
    currentStepId: null,
    createdAt: Timestamp.now(),
    archived: false,
    ...meeting,
  }),
})
export const getMeeting = methods.get
export const createMeeting = methods.create
export const updateMeeting = methods.update
export const subscribeMeeting = methods.subscribe

export const subscribeMeetingsByDates = memoize(
  (orgId: string, fromDate: Date, toDate: Date) =>
    subscribeQuery(
      query(
        collection,
        where('orgId', '==', orgId),
        where('archived', '==', false),
        where('startDate', '>=', fromDate),
        where('startDate', '<', Timestamp.fromDate(toDate))
      )
    )
)

export const subscribeMeetingsByCircle = memoize(
  (orgId: string, circleId: string) =>
    subscribeQuery(
      query(
        collection,
        where('orgId', '==', orgId),
        where('archived', '==', false),
        where('circleId', '==', circleId),
        orderBy('startDate', 'desc')
      )
    )
)

export function updateMeetingDates(id: string, startDate: Date, endDate: Date) {
  updateMeeting(id, {
    startDate: Timestamp.fromDate(startDate),
    endDate: Timestamp.fromDate(endDate),
  })
}

export async function goToNextMeetingStep(
  meeting: MeetingEntry,
  participants: ParticipantMember[]
) {
  if (!meeting) return

  // Meeting not started
  if (meeting.currentStepId === null) {
    const firstStep = meeting.stepsConfig[0]
    if (firstStep) {
      setInMeetingStatus(participants, meeting.id)
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
    setInMeetingStatus(participants, meeting.id)
    await updateMeeting(meeting.id, {
      currentStepId: null,
      ended: true,
    })
  }
}

export async function getMeetingsIcalUrl(
  orgId: string | undefined,
  memberId?: string,
  circleId?: string
) {
  const { data: token } = await httpsCallable(
    functions,
    'getMeetingsToken'
  )({
    orgId,
  })
  return `${
    settings.firebaseFunctionsUrl
  }api/meetings.ics?token=${token}&orgId=${orgId}${
    memberId ? `&memberId=${memberId}` : circleId ? `&circleId=${circleId}` : ''
  }`
}
