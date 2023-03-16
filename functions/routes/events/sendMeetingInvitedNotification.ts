import { MeetingFragment, Member_Role_Enum } from '@gql'
import { guardOrg } from '@utils/guardOrg'
import { guardWebhookSecret } from '@utils/guardWebhookSecret'
import { HasuraEvent, HasuraEventOp } from '@utils/nhost'
import { route, RouteError } from '@utils/route'
import { meetingInvitedInsertAction } from '@utils/notification/meetingInvitedInsertAction'
import { meetingInvitedUpdateAction } from '@utils/notification/meetingInvitedUpdateAction'
import { defaultLang, resources } from '@i18n'
import { MeetingInvitedNotification } from '@utils/notification/meetingInvitedNotification'
import { getNotificationSenderAndRecipients } from '@utils/notification/getNotificationSenderAndRecipients'
import { MeetingInvitedActionReturn } from '@shared/model/notification'

export default route(async (context): Promise<void> => {
  guardWebhookSecret(context)

  const event: HasuraEvent<MeetingFragment> = context.req.body

  // Sender
  const senderUserId = event.event.session_variables['x-hasura-user-id']
  if (!senderUserId) {
    throw new RouteError(401, 'Unauthorized')
  }

  // Check if new meeting (should always be provided in event)
  if (!event.event.data.new) {
    throw new RouteError(404, 'No new meeting')
  }

  // Check if it's an occurrence of a recurring meeting
  if (event.event.data.new.recurringId) {
    return
  }

  // Check permission for new meeting org
  const orgId = event.event.data.new.orgId
  await guardOrg({ userId: senderUserId }, orgId, Member_Role_Enum.Member)

  // What needs to be done in each event case
  let meetingInvitedActionReturn: MeetingInvitedActionReturn | null = null
  switch (event.event.op) {
    case HasuraEventOp.INSERT:
      meetingInvitedActionReturn = await meetingInvitedInsertAction(
        senderUserId,
        event.event.data.new
      )
      break

    case HasuraEventOp.UPDATE:
      meetingInvitedActionReturn = await meetingInvitedUpdateAction(
        senderUserId,
        event.event.data.new,
        event.event.data.old
      )
      break

    default:
      break
  }

  if (!meetingInvitedActionReturn) {
    return
  }

  // Get sender and recipients
  const { sender, recipients } = await getNotificationSenderAndRecipients(
    senderUserId,
    meetingInvitedActionReturn.participantsIds
  )
  if (recipients.length === 0) {
    return
  }

  const locale = (sender?.locale as keyof typeof resources) || defaultLang

  // Build MeetingInvitedNotification instance
  const notification = new MeetingInvitedNotification(locale, {
    org: meetingInvitedActionReturn.meeting.org,
    orgId: meetingInvitedActionReturn.meeting.orgId,
    meetingId: meetingInvitedActionReturn.meeting.id,
    title: meetingInvitedActionReturn.meeting.title || '',
    role: meetingInvitedActionReturn.meeting.circle.role.name || '',
    sender: sender?.name || '',
  })

  // Send notification "meetinginvited"
  await notification.send(recipients)
})
