import Mailjet, { SendEmailV3_1 } from 'node-mailjet'
import settings from './settings'

export async function sendMailjetEmail(
  ...messages: SendEmailV3_1.IBody['Messages']
) {
  const client = new Mailjet({
    apiKey: settings.mailjet.public,
    apiSecret: settings.mailjet.private,
  })
  await client
    .post('send', { version: 'v3.1' })
    .request<any>({ Messages: messages })
}
