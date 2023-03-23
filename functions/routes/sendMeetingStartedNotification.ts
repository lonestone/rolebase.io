import { gql, Member_Role_Enum } from '@gql'
import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { RouteError, route } from '@utils/route'
import { adminRequest } from '@utils/adminRequest'
import { getNotificationSenderAndRecipients } from '@utils/notification/getNotificationSenderAndRecipients'
import * as yup from 'yup'
import { MeetingStartedNotification } from '@utils/notification/meetingStartedNotification'
import { defaultLang, resources } from '@i18n'
import { guardOrg } from '@utils/guardOrg'

const yupSchema = yup.object({
  recipientMemberIds: yup.array().of(yup.string().required()),
  meetingId: yup.string().required(),
})

export default route(async (context): Promise<void> => {
  guardAuth(context)

  const { meetingId, recipientMemberIds } = guardBodyParams(context, yupSchema)

  // Get meeting data
  const { meeting_by_pk } = await adminRequest(GET_MEETING_DATA, {
    id: meetingId,
    userId: context?.userId!,
  })
  if (!meeting_by_pk) {
    throw new RouteError(404, 'Meeting not found')
  }

  const { org, id, title, circle, attendees } = meeting_by_pk

  // Check if user can access org data
  const orgId = org.id
  await guardOrg(orgId, Member_Role_Enum.Member, context.userId)

  // If recipientMemberIds provided : send only to those recipients
  // Else send to all attendees
  const allRecipientIds =
    recipientMemberIds ?? attendees?.map((a) => a.memberId) ?? []

  if (!allRecipientIds || allRecipientIds.length === 0) return
  // Get sender and recipients
  const { sender, recipients } = await getNotificationSenderAndRecipients(
    context?.userId!,
    [...new Set([org.members[0].id, ...allRecipientIds])]
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

const GET_MEETING_DATA = gql(`
  query getMeetingData($id: uuid!, $userId:uuid!) {
    meeting_by_pk(id: $id) {
      id
      org {
        ...Org
        members(where: { userId: { _eq: $userId }}) {
          id
        }
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
