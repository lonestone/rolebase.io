import { gql } from '@gql'
import { Novu, TriggerRecipientsPayload } from '@novu/node'
import { adminRequest } from '@utils/adminRequest'
import { guardAuth } from '@utils/guardAuth'
import { getNotificationYupSchema } from '@utils/getNotificationYupSchema'
import { guardBodyParams } from '@utils/guardBodyParams'
import { route, RouteError } from '@utils/route'
import settings from '@utils/settings'
import { NotificationCategories } from '@shared/model/notification'

export default route(async (context): Promise<void> => {
  guardAuth(context)

  const { category } = context.req.body
  if (!category || !NotificationCategories[category]) {
    throw new RouteError(400, 'Invalid notification category')
  }

  const yupSchema = getNotificationYupSchema(category)

  const { title, content, recipientMemberIds, actionUrl, ...rest } =
    guardBodyParams(context, yupSchema)

  // Get recipients
  const recipientsResult = await adminRequest(GET_RECIPIENTS, {
    memberIds: recipientMemberIds,
  })

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

  if (recipients.length === 0) return

  // Novu logic
  const novu = new Novu(settings.novu.apiKey)

  await novu
    .trigger(category!, {
      to: recipients,
      payload: {
        title,
        content,
        actionUrl,
        ...rest,
      },
    })
    .catch((err) => console.error(err))
})

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
