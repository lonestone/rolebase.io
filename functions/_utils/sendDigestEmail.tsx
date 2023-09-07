import i18n from '@i18n'
import { render } from '@react-email/components'
import { sendMailjetEmail } from '@utils/sendMailjetEmail'
import settings from '@utils/settings'
import { SendEmailV3_1 } from 'node-mailjet'
import React from 'react'
import Digest, { OrgDigest } from '../_emails/Digest'

interface Params {
  recipient: SendEmailV3_1.IEmailAddressTo
  lang: string
  orgDigests: OrgDigest[]
}

export default async function sendDigestEmail({
  recipient,
  lang,
  orgDigests,
}: Params) {
  const subject = i18n.t(`emails.Digest.subject`, { lng: lang })

  // Render email to HTML
  const emailHTML = render(<Digest lang={lang} orgDigests={orgDigests} />)

  try {
    await sendMailjetEmail({
      From: {
        Email: settings.mail.sender.email,
        Name: settings.mail.sender.name,
      },
      To: [recipient],
      TemplateLanguage: true,
      Subject: subject,
      HTMLPart: emailHTML,
    })
  } catch (error) {
    console.error('Error sending invitation email', error)
  }
}
