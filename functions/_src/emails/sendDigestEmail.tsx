import i18n from '@i18n'
import { render } from '@react-email/components'
import { SendEmailV3_1 } from 'node-mailjet'
import React from 'react'
import settings from '../settings'
import { sendMailjetEmail } from './sendMailjetEmail'
import Digest, { OrgDigest } from './templates/Digest'

interface Params {
  recipient: SendEmailV3_1.IEmailAddressTo
  lang: string
  timezone: string
  orgDigests: OrgDigest[]
}

export default async function sendDigestEmail({
  recipient,
  lang,
  timezone,
  orgDigests,
}: Params) {
  const subject = i18n.t('emails.Digest.subject', { lng: lang })

  // Render email to HTML
  const emailHTML = render(
    <Digest lang={lang} timezone={timezone} orgDigests={orgDigests} />
  )

  try {
    await sendMailjetEmail({
      From: {
        Email: settings.mail.sender.email,
        Name: settings.mail.sender.name,
      },
      To: [recipient],
      Subject: subject,
      HTMLPart: emailHTML,
    })
  } catch (error) {
    console.error('Error sending invitation email', error)
  }
}
