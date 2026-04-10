import { sendBrevoEmail } from './sendBrevoEmail'

export interface EmailAddress {
  Email: string
  Name: string
}

export interface EmailMessage {
  From: EmailAddress
  To: EmailAddress[]
  Subject: string
  HTMLPart?: string
  TextPart?: string
}

export async function sendEmail(...messages: EmailMessage[]) {
  await sendBrevoEmail(...messages)
}
