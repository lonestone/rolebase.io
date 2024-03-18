import { render } from '@react-email/components'
import { SendEmailV3_1 } from 'node-mailjet'
import React from 'react'
import Meeting, { MeetingEmailProps } from '../components/templates/Meeting'
import i18n from '../i18n'
import settings from '../settings'
import { sendMailjetEmail } from './sendMailjetEmail'

export default async function sendMeetingEmail(
  emailProps: MeetingEmailProps,
  recipients: SendEmailV3_1.IEmailAddressTo[]
) {
  const subject = i18n.t(`emails:Meeting.subject`, {
    lng: emailProps.lang,
    replace: {
      title: emailProps.title,
      role: emailProps.role,
    },
  })

  // Render email to HTML
  const emailHTML = render(<Meeting {...emailProps} />)

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
