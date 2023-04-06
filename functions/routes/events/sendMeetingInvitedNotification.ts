import { MeetingFragment, Member_Role_Enum } from '@gql'
import { defaultLang, resources } from '@i18n'
import { guardOrg } from '@utils/guardOrg'
import { HasuraEventOp } from '@utils/nhost'
import { route } from '@utils/route'
import { meetingInvitedInsertAction } from '@utils/notification/meeting/meetingInvitedInsertAction'
import { meetingInvitedUpdateAction } from '@utils/notification/meeting/meetingInvitedUpdateAction'
import { MeetingInvitedNotification } from '@utils/notification/meeting/meetingInvitedNotification'
import { getNotificationSenderAndRecipients } from '@utils/notification/getNotificationSenderAndRecipients'
import { NotificationMeetingData } from '@utils/notification/meeting/getNotificationMeetingData'
import { checkSendNotificationEvent } from '@utils/notification/checkSendNotificationEvent'

export default route(async (context): Promise<void> => {
  const {
    fullEvent: { event },
    senderUserId,
  } = checkSendNotificationEvent<MeetingFragment>(context)

  // Check if it's an occurrence of a recurring meeting
  if (event.data.new!.recurringId) {
    return
  }

  // Check permission for new meeting org
  await guardOrg(event.data.new!.orgId, Member_Role_Enum.Member, {
    userId: senderUserId,
  })

  // What needs to be done in each event case
  let meetingInvitedActionReturn: {
    meeting: NotificationMeetingData
    participantsIds: string[]
  } | null = null
  switch (event.op) {
    // Done if a new meeting is inserted in DB
    case HasuraEventOp.INSERT:
      meetingInvitedActionReturn = await meetingInvitedInsertAction(
        senderUserId,
        event.data.new!
      )
      break

    // Done if there is an update for some fields of a meeting in DB
    case HasuraEventOp.UPDATE:
      meetingInvitedActionReturn = await meetingInvitedUpdateAction(
        senderUserId,
        event.data.new!,
        event.data.old
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

  const { org, orgId, id, title, circle } = meetingInvitedActionReturn.meeting

  // Build MeetingInvitedNotification instance
  const notification = new MeetingInvitedNotification(locale, {
    org,
    orgId,
    meetingId: id,
    title,
    role: circle.role.name,
    sender: sender?.name || '',
  })

  // Send notification "meetinginvited"
  await notification.send(recipients)
})
