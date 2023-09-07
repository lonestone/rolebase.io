import { Member_Role_Enum, gql } from '@gql'
import { getOrgPath } from '@shared/helpers/getOrgPath'
import { adminRequest } from '@utils/adminRequest'
import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { guardOrg } from '@utils/guardOrg'
import { RouteError, route } from '@utils/route'
import sendMemberActivityEmail from '@utils/sendMemberActivityEmail'
import settings from '@utils/settings'
import * as yup from 'yup'

const yupSchema = yup.object({
  meetingId: yup.string().required(),
  recipientMemberIds: yup.array().of(yup.string().required()).required(),
})

export default route(async (context): Promise<void> => {
  const userId = guardAuth(context)

  const { meetingId, recipientMemberIds } = guardBodyParams(context, yupSchema)

  const result = await adminRequest(GET_MEETING_INVITED_NOTIFICATION_DATA, {
    userId,
    meetingId,
    recipientMemberIds,
  })
  const meeting = result?.meeting_by_pk
  const org = meeting?.org
  const recipients = org?.members
    .filter((member) => member.user?.email)
    .map((member) => ({
      Email: member.user!.email!,
      Name: member.name,
    }))
  const sender = org?.sender[0]

  if (!meeting || !org || !recipients || !sender || !sender.user) {
    throw new RouteError(404, 'Meeting or sender not found')
  }

  await guardOrg(org.id, Member_Role_Enum.Member, context)

  if (recipients.length === 0) {
    throw new RouteError(404, 'No recipient found')
  }

  // Prepare meeting url
  const ctaUrl = `${settings.url}${getOrgPath(org)}/meetings/${meetingId}`

  // Send email
  await sendMemberActivityEmail({
    recipients,
    type: 'MeetingStart',
    lang: sender.user.locale,
    replace: {
      title: meeting.title,
      role: meeting.circle.role.name,
      member: sender.name,
    },
    picture: sender.picture || '',
    ctaUrl,
  })
})

const GET_MEETING_INVITED_NOTIFICATION_DATA = gql(`
  query getMeetingInvitedNotificationData(
    $userId: uuid!
    $meetingId: uuid!
    $recipientMemberIds: [uuid!]!
  ) {
    meeting_by_pk(id: $meetingId) {
      id
      title
      circle {
        role {
          name
        }
      }
      org {
        id
        slug
        members(where: { id: { _in: $recipientMemberIds } }) {
          name
          user {
            email
          }
        }
        sender: members(where: { user: { id: { _eq: $userId } } }) {
          name
          picture
          user {
            locale
          }
        }
      }
    }
  }

`)
