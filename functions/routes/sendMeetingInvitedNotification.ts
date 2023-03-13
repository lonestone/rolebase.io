import { Member_Role_Enum } from '@gql'
import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { route } from '@utils/route'
import { getNotificationSenderAndRecipients } from '@utils/notification/getNotificationSenderAndRecipients'
import * as yup from 'yup'
import { defaultLang, resources } from '@i18n'
import { guardOrg } from '@utils/guardOrg'
import { MeetingInvitedNotification } from '@utils/notification/meetingInvitedNotification'
import { getNotificationMeetingData } from '@utils/notification/getNotificationMeetingData'
import { getParticipantIdsByScope } from '@utils/getParticipantIdsByScope'

const yupSchema = yup.object({
  recipientMemberIds: yup.array().of(yup.string().required()),
  meetingId: yup.string().required(),
})

export default route(async (context): Promise<void> => {
  guardAuth(context)

  const { meetingId, recipientMemberIds } = guardBodyParams(context, yupSchema)

  // Get meeting data
  const meetingDataResult = await getNotificationMeetingData(
    meetingId,
    context?.userId!
  )

  // Check if user can access org data
  const orgId = meetingDataResult.org.id
  await guardOrg(context, orgId, Member_Role_Enum.Member)

  // Get all recipients list
  // If recipientMemberIds provided : send only to those recipients
  // Else send to all members invited (by scope or extra)
  let allRecipientIds =
    recipientMemberIds ??
    (await getParticipantIdsByScope(
      meetingDataResult.orgId,
      meetingDataResult.circleId,
      meetingDataResult.participantsScope,
      meetingDataResult.participantsMembersIds
    )) ??
    []

  if (!allRecipientIds || allRecipientIds.length === 0) return

  // Get sender and recipients
  const { sender, recipients } = await getNotificationSenderAndRecipients(
    context?.userId!,
    allRecipientIds
  )

  if (recipients.length === 0) return

  const locale = (sender?.locale as keyof typeof resources) || defaultLang

  // Build MeetingInvitedNotification instance
  const notification = new MeetingInvitedNotification(locale, {
    org: meetingDataResult.org,
    orgId: meetingDataResult.orgId,
    meetingId: meetingDataResult.id,
    title: meetingDataResult.title || '',
    role: meetingDataResult?.circle.role.name || '',
    sender: sender?.name || '',
  })

  // Send notification "meetinginvited"
  await notification.send(recipients)
})
