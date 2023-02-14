import { gql } from '@gql'
import MagicBellClient, { Notification } from '@magicbell/core'
import { Recipient } from '@magicbell/core/dist/models/Notification/NewNotification'
import { NotificationCategories } from '@shared/model/notification'
import { adminRequest } from '@utils/adminRequest'
import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { route } from '@utils/route'
import settings from '@utils/settings'
import * as yup from 'yup'

const yupSchema = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
  category: yup.string().oneOf(Object.values(NotificationCategories)),
  topic: yup.string(),
  url: yup.string(),
  recipientMemberIds: yup.array().of(yup.string().required()).required(),
})

export default route(async (context): Promise<void> => {
  guardAuth(context)
  const { category, title, content, recipientMemberIds, url, topic } =
    guardBodyParams(context, yupSchema)

  // Get recipients
  const recipientsResult = await adminRequest(GET_RECIPIENTS, {
    memberIds: recipientMemberIds,
  })

  const recipients = recipientsResult.member
    .map((member): Recipient | undefined =>
      member.user
        ? {
            external_id: member.user.id!,
            email: member.user.email!,
          }
        : undefined
    )
    .filter(Boolean) as Recipient[]
  if (recipients.length === 0) return

  MagicBellClient.configure({
    apiKey: settings.magicbell.apiKey,
    apiSecret: settings.magicbell.apiSecret,
  })

  await Notification.create({
    category,
    title,
    content,
    action_url: url,
    topic,
    recipients,
  })
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
