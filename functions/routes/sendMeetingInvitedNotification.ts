import { Member_Role_Enum } from '@gql'
import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { route } from '@utils/route'
import settings from '@utils/settings'
import { getOrgPath } from '@shared/helpers/getOrgPath'
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
  const meeting_by_pk = await getNotificationMeetingData(
    meetingId,
    context?.userId!
  )

  // Check if user can access org data
  const orgId = meeting_by_pk.org.id
  await guardOrg(context, orgId, Member_Role_Enum.Member)

  // Get all recipients list
  // If recipientMemberIds provided : send only to those recipients
  // Else send to all members invited (by scope or extra)
  let allRecipientIds =
    recipientMemberIds ??
    (await getParticipantIdsByScope(
      meeting_by_pk.org.id,
      meeting_by_pk.circle.id,
      meeting_by_pk.participantsScope,
      meeting_by_pk.participantsMembersIds
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

  // Get actionUrl
  const actionUrl = meeting_by_pk.org
    ? `${settings.url}${getOrgPath(meeting_by_pk.org)}/meetings/${meetingId}`
    : `${settings.url}/orgs/${orgId}/meetings/${meetingId}`

  // Build MeetingInvitedNotification instance
  const notification = new MeetingInvitedNotification(locale, {
    isRecurring: !!meeting_by_pk?.recurringId,
    title: meeting_by_pk?.title || '',
    role: meeting_by_pk?.circle.role.name || '',
    sender: sender?.name || '',
    actionUrl,
  })

  // Send notification "meetinginvited"
  await notification.send(recipients)
})
