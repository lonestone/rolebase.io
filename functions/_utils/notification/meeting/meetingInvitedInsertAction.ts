import { MeetingFragment } from '@gql'
import { getEntityWithParticipantsRecipientIds } from '@utils/getEntityWithParticipantsRecipientIds'
import { getNotificationMeetingData } from '@utils/notification/meeting/getNotificationMeetingData'

export async function meetingInvitedInsertAction(
  senderUserId: string,
  meeting: MeetingFragment
) {
  // Get meeting data
  const meetingDataResult = await getNotificationMeetingData(
    meeting.id,
    senderUserId
  )

  // Get all recipients (by scope or extra) to send notification to
  const recipientIds = await getEntityWithParticipantsRecipientIds(meeting)

  return recipientIds?.length
    ? {
        meeting: meetingDataResult,
        participantsIds: recipientIds,
      }
    : null
}
