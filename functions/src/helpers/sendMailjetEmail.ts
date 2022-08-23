import * as mailjet from 'node-mailjet'
import settings from '../settings'

export function sendMailjetEmail(
  ...messages: mailjet.Email.SendParamsMessage[]
) {
  return mailjet
    .connect(settings.mailjet.public, settings.mailjet.private)
    .post('send', { version: 'v3.1' })
    .request({ Messages: messages })
}
