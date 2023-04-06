import { Member_Role_Enum } from '@gql'
import { defaultLang, resources } from '@i18n'
import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { guardOrg } from '@utils/guardOrg'
import { getNotificationMeetingData } from '@utils/notification/getNotificationMeetingData'
import { getNotificationSenderAndRecipients } from '@utils/notification/getNotificationSenderAndRecipients'
import { MeetingStartedNotification } from '@utils/notification/meetingStartedNotification'
import { route } from '@utils/route'
import * as yup from 'yup'

const yupSchema = yup.object({
  recipientMemberIds: yup.array().of(yup.string().required()),
  meetingId: yup.string().required(),
})

export default route(async (context): Promise<void> => {
  guardAuth(context)

  const { meetingId, recipientMemberIds } = guardBodyParams(context, yupSchema)

  // Get meeting data
  const meeting_by_pk = await getNotificationMeetingData(
    meetingId,
    context?.userId!
  )

  const { org, id, title, circle, attendees } = meeting_by_pk

  // Check if user can access org data
  const orgId = org.id
  await guardOrg(orgId, Member_Role_Enum.Member, context)

  // If recipientMemberIds provided : send only to those recipients
  // Else send to all attendees
  const allRecipientIds =
    recipientMemberIds ?? attendees?.map((a) => a.memberId) ?? []

  if (!allRecipientIds || allRecipientIds.length === 0) return
  // Get sender and recipients
  const { sender, recipients } = await getNotificationSenderAndRecipients(
    context?.userId!,
    [...new Set([...allRecipientIds])]
  )
  if (recipients.length === 0) return

  const locale = (sender?.locale as keyof typeof resources) || defaultLang

  // Build MeetingStartedNotification instance for each recipient depending on its locale
  const notification = new MeetingStartedNotification(locale, {
    org,
    orgId,
    meetingId: id,
    title,
    role: circle.role.name,
    sender: sender?.name || '',
  })
  // Send notification "meetingstarted"
  await notification.send(recipients)
})
