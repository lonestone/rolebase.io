import { MeetingFragment } from '@gql'
import { getParticipantIdsDiff } from '@utils/getParticipantIdsDiff'
import { RouteError } from '@utils/route'
import { getNotificationMeetingData } from '@utils/notification/meeting/getNotificationMeetingData'

export async function meetingInvitedUpdateAction(
  senderUserId: string,
  newMeeting: MeetingFragment,
  oldMeeting: MeetingFragment | null
) {
  if (!oldMeeting) {
    throw new RouteError(404, 'Bad request')
  }

  // Get diff in meeting participants
  const newParticipantIds = await getParticipantIdsDiff(oldMeeting, newMeeting)
  if (!newParticipantIds || newParticipantIds.length === 0) {
    return null
  }

  // Send notification
  // If changes on participants : send meetinginvited notification only to new participants
  const meeting = await getNotificationMeetingData(newMeeting.id!, senderUserId)

  return { meeting, participantsIds: newParticipantIds }
}
