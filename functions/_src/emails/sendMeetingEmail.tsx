import { sendMailjetEmail } from '@emails/sendMailjetEmail'
import i18n from '@i18n'
import { render } from '@react-email/components'
import { SendEmailV3_1 } from 'node-mailjet'
import React from 'react'
import settings from '../settings'
import Meeting, { MeetingEmailProps } from './templates/Meeting'

export default async function sendMeetingEmail(
  emailProps: MeetingEmailProps,
  recipients: SendEmailV3_1.IEmailAddressTo[]
) {
  const subject = i18n.t(`emails.Meeting.subject`, {
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
        Email: settings.mail.sender.email,
        Name: settings.mail.sender.name,
      },
      To: recipients,
      Subject: subject,
      HTMLPart: emailHTML,
    })
  } catch (error) {
    console.error('Error sending invitation email', error)
  }
}
