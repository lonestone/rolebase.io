import { render } from '@react-email/components'
import { SendEmailV3_1 } from 'node-mailjet'
import React from 'react'
import MemberActiviy from '../components/templates/MemberActivity'
import i18n from '../i18n'
import settings from '../settings'
import { sendMailjetEmail } from './sendMailjetEmail'

interface Params {
  recipients: SendEmailV3_1.IEmailAddressTo[]
  type: string
  lang: string
  replace: Record<string, string>
  picture: string
  ctaUrl: string
}

export default async function sendMemberActivityEmail({
  recipients,
  type,
  lang,
  replace,
  picture,
  ctaUrl,
}: Params) {
  const subject = i18n.t(`MemberActivity.${type}.subject`, {
    lng: lang,
    replace,
  })

  // Render email to HTML
  const emailHTML = render(
    <MemberActiviy
      type={type}
      lang={lang}
      picture={picture}
      ctaUrl={ctaUrl}
      replace={replace}
    />
  )

  try {
    await sendMailjetEmail({
      From: {
        Email: settings.sender.email,
        Name: settings.sender.name,
      },
      To: recipients,
      Subject: subject,
      HTMLPart: emailHTML,
    })
  } catch (error) {
    console.error('Error sending invitation email', error)
  }
}
