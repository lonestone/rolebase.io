import Mailjet, { SendEmailV3_1 } from 'node-mailjet'
import settings from '../settings'

export async function sendMailjetEmail(
  ...messages: SendEmailV3_1.IBody['Messages']
) {
  const client = new Mailjet({
    apiKey: settings.mailjet.public,
    apiSecret: settings.mailjet.private,
  })
  const messagesWithHeaders = messages.map((message) => ({
    ...message,
    Headers: {
      ...message.Headers,
      'Auto-Submitted': 'auto-generated',
    },
  }))
  await client
    .post('send', { version: 'v3.1' })
    .request<any>({ Messages: messagesWithHeaders })
}
