import { MeetingFragment, Member_Role_Enum } from '@gql'
import { getParticipantIdsDiff } from '@utils/getParticipantIdsDiff'
import { guardOrg } from '@utils/guardOrg'
import { getNotificationMeetingData } from '@utils/notification/getNotificationMeetingData'
import { RouteError } from '@utils/route'

export async function meetingInvitedUpdateAction(
  senderUserId: string,
  newMeeting: MeetingFragment,
  oldMeeting: MeetingFragment | null
) {
  if (!oldMeeting) {
    throw new RouteError(404, 'Bad request')
  }

  //  Check permission for old meeting org
  await guardOrg(oldMeeting.orgId!, Member_Role_Enum.Member, {
    userId: senderUserId,
  })

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
