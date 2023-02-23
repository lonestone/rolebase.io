import { gql, Member_Role_Enum } from '@gql'
import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { RouteError, route } from '@utils/route'
import settings from '@utils/settings'
import { getOrgPath } from '@shared/helpers/getOrgPath'
import { adminRequest } from '@utils/adminRequest'
import { getNotificationSenderAndRecipients } from '@utils/notification/getNotificationSenderAndRecipients'
import * as yup from 'yup'
import { MeetingStartedNotification } from '@utils/notification/meetingStartedNotification'
import { defaultLang, resources } from '@i18n'
import { guardOrg } from '@utils/guardOrg'

const yupSchema = yup.object({
  meetingId: yup.string().required(),
})

export default route(async (context): Promise<void> => {
  guardAuth(context)

  const { meetingId } = guardBodyParams(context, yupSchema)

  // Get meeting data
  const { meeting_by_pk } = await adminRequest(GET_MEETING_DATA, {
    id: meetingId,
  })
  if (!meeting_by_pk) {
    throw new RouteError(404, 'Meeting not found')
  }
  // Check if user can access org data
  const orgId = meeting_by_pk.org.id
  await guardOrg(context, orgId, Member_Role_Enum.Member)

  // Get all recipient ids
  const allRecipientIds =
    meeting_by_pk.attendees && meeting_by_pk.attendees.map((a) => a.memberId)
  if (!allRecipientIds || allRecipientIds.length === 0) return
  // Get sender and recipients
  const { sender, recipients } = await getNotificationSenderAndRecipients(
    context?.userId!,
    allRecipientIds
  )
  if (recipients.length === 0) return

  const locale = (sender?.locale as keyof typeof resources) || defaultLang

  // Get actionUrl
  let actionUrl = settings.url
  actionUrl =
    meeting_by_pk.org || orgId
      ? `${actionUrl}${getOrgPath(meeting_by_pk.org)}/meetings/${meetingId}`
      : `${actionUrl}/orgs/${orgId}/meetings/${meetingId}`

  // Build MeetingStartedNotification instance for each recipient depending on its locale
  const notification = new MeetingStartedNotification(locale, {
    title: meeting_by_pk?.title || '',
    role: meeting_by_pk?.circle.role.name || '',
    sender: sender?.name || '',
    actionUrl,
  })
  // Send notification "meetingstarted"
  await notification.send(recipients)
})

const GET_MEETING_DATA = gql(`
  query getMeetingData($id: uuid!) {
    meeting_by_pk(id: $id) {
      id
      org {
        ...Org
      }
      title
      circle {
        role {
          name
        }
      }
      attendees
    }
  }
`)
