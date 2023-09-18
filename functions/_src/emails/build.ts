// Trick settings.ts to consider we are in production
process.env.NHOST_ADMIN_SECRET = '1'

import { render } from '@react-email/components'
import fs from 'fs'
import path from 'path'
import { createElement } from 'react'
import i18n from '../i18n'
import NhostEmail from './templates/NhostEmail'

const emailsFolder = path.join(__dirname, '../../../nhost/emails')

const types = [
  'email-confirm-change',
  'email-verify',
  'password-reset',
  'signin-passwordless',
]

const langs = ['fr', 'en']

for (const lang of langs) {
  for (const type of types) {
    const folder = path.join(emailsFolder, lang, type)

    // Prepare content icon to SVG string
    const body = render(createElement(NhostEmail, { type, lang }))
    const subject = i18n.t(`emails.NhostEmail.${type}.subject`, { lng: lang })

    // Write files
    fs.writeFileSync(path.join(folder, 'body.html'), body, 'utf8')
    fs.writeFileSync(path.join(folder, 'subject.txt'), subject, 'utf8')
  }
}
