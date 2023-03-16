import { MeetingFragment, Member_Role_Enum } from '@gql'
import { getMeetingParticipantIdsDiff } from '@utils/getMeetingParticipantIdsDiff'
import { guardWebhookSecret } from '@utils/guardWebhookSecret'
import { HasuraEvent } from '@utils/nhost'
import { guardOrg } from '@utils/guardOrg'
import { route, RouteError } from '@utils/route'
import { meetingInvitedSend } from '@utils/meetingInvitedSend'
import { getNotificationMeetingData } from '@utils/notification/getNotificationMeetingData'

export default route(async (context): Promise<void> => {
  guardWebhookSecret(context)

  const event: HasuraEvent = context.req.body

  // Sender
  const senderUserId = event.event.session_variables['x-hasura-user-id']
  if (!senderUserId) {
    throw new RouteError(401, 'Unauthorized')
  }

  // Old meeting
  const oldMeeting: MeetingFragment = event.event.data.old
  if (!oldMeeting) {
    throw new RouteError(404, 'No old meeting')
  }
  //  Check permission for old meeting org
  await guardOrg(
    { userId: senderUserId },
    oldMeeting.orgId!,
    Member_Role_Enum.Member
  )

  // New meeting
  const newMeeting: MeetingFragment = event.event.data.new
  if (!newMeeting) {
    throw new RouteError(404, 'No new meeting')
  }
  //  Check permission for new meeting org (even if orgs should be the same)
  await guardOrg(
    { userId: senderUserId },
    newMeeting.orgId!,
    Member_Role_Enum.Member
  )

  // Get diff in meeting participants
  const newParticipantIds = await getMeetingParticipantIdsDiff(
    oldMeeting,
    newMeeting
  )
  if (!newParticipantIds || newParticipantIds.length === 0) {
    return
  }

  // Send notification
  // If changes on participants : send meetinginvited notification only to new participants
  const meeting = await getNotificationMeetingData(newMeeting.id!, senderUserId)

  await meetingInvitedSend(senderUserId, newParticipantIds, meeting)
})
