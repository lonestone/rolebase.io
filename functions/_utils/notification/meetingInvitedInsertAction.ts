import { MeetingFragment } from '@gql'
import { RouteError } from '@utils/route'
import { getNotificationMeetingData } from '@utils/notification/getNotificationMeetingData'
import { getParticipantsByScope } from '@shared/helpers/getParticipantsByScope'
import { getOrgCirclesFullAndMembers } from '@utils/getOrgCirclesFullAndMembers'

export async function meetingInvitedInsertAction(
  senderUserId: string,
  meeting: MeetingFragment
) {
  // Get meeting data
  const meetingDataResult = await getNotificationMeetingData(
    meeting.id,
    senderUserId
  )

  // Get meeting org
  const org = await getOrgCirclesFullAndMembers(meeting.orgId)
  if (!org) {
    throw new RouteError(404, 'Org not found')
  }

  // Get all recipients (by scope or extra) to send notification to
  const recipientIds = getParticipantsByScope(
    org.members,
    meetingDataResult.circleId,
    org.circles,
    meetingDataResult.participantsScope,
    meetingDataResult.participantsMembersIds
  ).map((participant) => participant.member.id)

  return recipientIds?.length
    ? {
        meeting: meetingDataResult,
        participantsIds: recipientIds,
      }
    : null
}
