import * as mailjet from 'node-mailjet'
import settings from '../settings'

let client: mailjet.Email.Client | undefined

export function sendMailjetEmail(
  ...messages: mailjet.Email.SendParamsMessage[]
) {
  if (!client) {
    client = mailjet.connect(settings.mailjet.public, settings.mailjet.private)
  }

  return client
    .post('send', { version: 'v3.1' })
    .request({ Messages: messages })
}
