import { MeetingFragment } from '@gql'
import { defaultLang, resources } from '@i18n'
import { HasuraEventOp } from '@utils/nhost'
import { checkSendNotificationEvent } from '@utils/notification/checkSendNotificationEvent'
import { getNotificationSenderAndRecipients } from '@utils/notification/getNotificationSenderAndRecipients'
import { NotificationMeetingData } from '@utils/notification/meeting/getNotificationMeetingData'
import { meetingInvitedInsertAction } from '@utils/notification/meeting/meetingInvitedInsertAction'
import { MeetingInvitedNotification } from '@utils/notification/meeting/meetingInvitedNotification'
import { meetingInvitedUpdateAction } from '@utils/notification/meeting/meetingInvitedUpdateAction'
import { route } from '@utils/route'

export default route(async (context): Promise<void> => {
  const {
    eventBody: {
      event: { op },
    },
    newEntity,
    oldEntity,
    senderUserId,
  } = checkSendNotificationEvent<MeetingFragment>(context)

  // Check if it's an occurrence of a recurring meeting
  if (newEntity.recurringId) {
    return
  }

  // What needs to be done in each event case
  let meetingInvitedActionReturn: {
    meeting: NotificationMeetingData
    participantsIds: string[]
  } | null = null
  switch (op) {
    // Done if a new meeting is inserted in DB
    case HasuraEventOp.INSERT:
      meetingInvitedActionReturn = await meetingInvitedInsertAction(
        senderUserId,
        newEntity
      )
      break

    // Done if there is an update for some fields of a meeting in DB
    case HasuraEventOp.UPDATE:
      meetingInvitedActionReturn = await meetingInvitedUpdateAction(
        senderUserId,
        newEntity,
        oldEntity
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
    meetingInvitedActionReturn.participantsIds,
    meetingInvitedActionReturn.meeting.orgId
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
