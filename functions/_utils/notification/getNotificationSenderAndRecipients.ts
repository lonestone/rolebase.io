import { gql } from '@gql'
import { ISubscribersDefine, TriggerRecipientsPayload } from '@novu/node'
import { adminRequest } from '@utils/adminRequest'
import { RouteError } from '@utils/route'

type GetNotificationSenderAndRecipientsReturn = {
  sender: ISubscribersDefine & { name: string }
  recipients: TriggerRecipientsPayload
}

export async function getNotificationSenderAndRecipients(
  senderId: string,
  recipientMemberIds: string[]
): Promise<GetNotificationSenderAndRecipientsReturn> {
  const recipientsResult = await adminRequest(GET_RECIPIENTS, {
    memberIds: recipientMemberIds,
    userId: senderId,
  })
  if (!recipientsResult) throw new RouteError(404, 'Members not found')

  // Get sender data
  const senderData = recipientsResult.member.filter(
    (recipient) => recipient.user?.id === senderId
  )[0]
  if (!senderData || !senderData.user) {
    throw new RouteError(404, 'User not found')
  }
  const sender = {
    subscriberId: senderData.user.id!,
    name: senderData.name,
    email: senderData.user.email!,
    locale: senderData.user.locale,
  }

  // Get recipients
  const recipients = recipientsResult.member
    .filter((member) => member.user?.id !== senderId)
    .map((member) =>
      member.user
        ? {
            subscriberId: member.user.id!,
            email: member.user.email!,
            locale: member.user.locale!,
          }
        : undefined
    )
    .filter(Boolean) as TriggerRecipientsPayload

  return { sender, recipients }
}

const GET_RECIPIENTS = gql(`
  query getRecipients($memberIds: [uuid!]!, $userId: uuid!) {
    member(where: { _or: [{id: {_in: $memberIds}}, {userId: {_eq: $userId}}]}) {
      id
      name
      user {
        id
        email
        locale
      }
    }
  }
`)
