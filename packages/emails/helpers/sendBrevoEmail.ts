import { createTransport } from 'nodemailer'
import settings from '../settings'
import { EmailMessage } from './sendEmail'

export async function sendBrevoEmail(...messages: EmailMessage[]) {
  const transporter = createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
      user: settings.mailjet.public,
      pass: settings.mailjet.private,
    },
  })

  for (const message of messages) {
    await transporter.sendMail({
      from: `"${message.From.Name}" <${message.From.Email}>`,
      to: message.To.map((r) => `"${r.Name}" <${r.Email}>`).join(', '),
      subject: message.Subject,
      html: message.HTMLPart,
    })
  }
}
