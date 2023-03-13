import { MeetingNotificationDataFragment } from '@gql'
import { defaultLang, resources } from '@i18n'
import { getNotificationSenderAndRecipients } from './notification/getNotificationSenderAndRecipients'
import { MeetingInvitedNotification } from './notification/meetingInvitedNotification'
import { RouteError } from './route'

export async function meetingInvitedSend(
  userId: string,
  recipientIds: string[],
  meeting: MeetingNotificationDataFragment
) {
  if (!userId) {
    throw new RouteError(401, 'Unauthorized')
  }

  // Get sender and recipients
  const { sender, recipients } = await getNotificationSenderAndRecipients(
    userId,
    recipientIds
  )
  if (recipients.length === 0) {
    return
  }

  const locale = (sender?.locale as keyof typeof resources) || defaultLang

  // Build MeetingInvitedNotification instance
  const notification = new MeetingInvitedNotification(locale, {
    org: meeting.org,
    orgId: meeting.orgId,
    meetingId: meeting.id,
    title: meeting.title || '',
    role: meeting.circle.role.name || '',
    sender: sender?.name || '',
  })

  // Send notification "meetinginvited"
  await notification.send(recipients)
}
