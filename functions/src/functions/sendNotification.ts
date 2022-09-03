import MagicBellClient, { Notification } from '@magicbell/core'
import { Recipient } from '@magicbell/core/dist/models/Notification/NewNotification'
import { NotificationPayload } from '@shared/model/notification'
import * as functions from 'firebase-functions'
import { collections } from '../firebase'
import { guardArgument, guardAuth } from '../helpers/guards'
import settings from '../settings'

export const sendNotification = functions.https.onCall(
  async (data: NotificationPayload, context) => {
    guardAuth(context)
    guardArgument(data, 'category', 'string')
    guardArgument(data, 'title', 'string')
    guardArgument(data, 'content', 'string')
    guardArgument(data, 'recipientMemberIds', 'object')

    // Validate recipientMemberIds
    if (
      !data.recipientMemberIds.length ||
      data.recipientMemberIds.some((id) => typeof id !== 'string')
    ) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'recipientMemberIds must be an array of strings'
      )
    }

    const recipients = (
      await Promise.all(data.recipientMemberIds.map(getRecipient))
    ).filter(Boolean) as Recipient[]
    if (recipients.length === 0) return

    MagicBellClient.configure({
      apiKey: settings.magicbell.apiKey,
      apiSecret: settings.magicbell.apiSecret,
    })

    await Notification.create({
      category: data.category,
      title: data.title,
      content: data.content,
      action_url: data.url,
      topic: data.topic,
      recipients,
    })
  }
)

async function getRecipient(memberId: string): Promise<Recipient | undefined> {
  const memberRef = collections.members.doc(memberId)
  const member = (await memberRef.get()).data()
  if (!member || !member.userId) return

  const userRef = collections.users.doc(member.userId)
  const user = (await userRef.get()).data()
  if (!user) return

  return {
    external_id: userRef.id,
    email: user.email,
  }
}
