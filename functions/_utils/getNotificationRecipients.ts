import { gql } from '@gql'
import { adminRequest } from '@utils/adminRequest'
import { RouteError } from '@utils/route'
import { TriggerRecipientsPayload } from '@novu/node'

export async function getNotificationRecipients(recipientMemberIds: string[]) {
  const recipientsResult = await adminRequest(GET_RECIPIENTS, {
    memberIds: recipientMemberIds,
  })
  if (!recipientsResult) throw new RouteError(404, 'Member not found')

  const recipients = recipientsResult.member
    .map((member) =>
      member.user
        ? {
            subscriberId: member.user.id!,
            email: member.user.email!,
          }
        : undefined
    )
    .filter(Boolean) as TriggerRecipientsPayload
  return recipients
}

const GET_RECIPIENTS = gql(`
  query getRecipients($memberIds: [uuid!]!) {
    member(where: { id: { _in: $memberIds } }) {
      user {
        id
        email
      }
    }
  }
`)
