import { getCollection } from '@api/helpers/getCollection'
import { getEntityMethods } from '@api/helpers/getEntityMethods'
import { subscribeQuery } from '@api/helpers/subscribeQuery'
import { Meeting, MeetingEntry } from '@shared/model/meeting'
import { ParticipantMember } from '@shared/model/member'
import { Optional } from '@shared/model/types'
import { orderBy, query, Timestamp, where } from 'firebase/firestore'
import { httpsCallable } from 'firebase/functions'
import { memoize } from 'src/memoize'
import settings from 'src/settings'
import { functions } from '../firebase'
import { startMembersMeeting, stopMembersMeeting } from './members'

export const collection = getCollection<Meeting>('meetings')

const methods = getEntityMethods(collection, {
  createTransform: (
    meeting: Optional<
      Meeting,
      'createdAt' | 'ended' | 'currentStepId' | 'archived' | 'videoConf'
    >
  ) => ({
    ended: false,
    currentStepId: null,
    createdAt: Timestamp.now(),
    archived: false,
    videoConf: false,
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

// End meeting
export async function endMeeting(meetingId: string, membersIds: string[]) {
  await updateMeeting(meetingId, {
    currentStepId: null,
    ended: true,
  })
  stopMembersMeeting(membersIds, meetingId)
}

export async function goToNextMeetingStep(
  meeting: MeetingEntry,
  participants: ParticipantMember[]
) {
  const membersIds = participants.map((p) => p.member.id)

  // Meeting not started
  if (meeting.currentStepId === null) {
    const firstStep = meeting.stepsConfig[0]
    if (firstStep) {
      // Go to first step
      const changedFields: Partial<Meeting> = {
        currentStepId: firstStep.id,
        ended: false,
      }

      if (!meeting.attendees) {
        // Set attendees list
        changedFields.attendees = participants.map((participant) => ({
          memberId: participant.member.id,
          circlesIds: participant.circlesIds,
          present: null,
        }))
      }

      await updateMeeting(meeting.id, changedFields)
      startMembersMeeting(membersIds, meeting.id)
    } else {
      // No first step -> end meeting
      await endMeeting(meeting.id, membersIds)
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
    // No next step -> end meeting
    await endMeeting(meeting.id, membersIds)
  }
}

export async function getMeetingsIcalToken(orgId: string): Promise<string> {
  const { data: token } = await httpsCallable<{}, string>(
    functions,
    'getMeetingsToken'
  )({
    orgId,
  })
  return token
}

export function getMeetingsIcalUrl(
  orgId: string | undefined,
  token: string,
  lang: string,
  memberId?: string,
  circleId?: string
): string {
  return `${
    settings.firebaseFunctionsUrl
  }api/meetings.ics?token=${token}&lang=${lang}&orgId=${orgId}${
    memberId ? `&memberId=${memberId}` : circleId ? `&circleId=${circleId}` : ''
  }`
}
