import { App_Type_Enum } from '@gql'
import settings from '@settings'
import {
  AppCalendarConfig,
  Office365SecretConfig,
} from '@shared/model/user_app'
import { adminRequest } from '@utils/adminRequest'
import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { route } from '@utils/route'
import { google } from 'googleapis'
import * as yup from 'yup'
import { CREATE_USER_APP } from '..'

const yupSchema = yup.object().shape({
  code: yup.string().required(),
})

export default route(async (context) => {
  const userId = guardAuth(context)
  const { code } = guardBodyParams(context, yupSchema)

  const redirectUrl = `${settings.url}/apps/googlecalendar-auth-redirect`

  const oAuth2Client = new google.auth.OAuth2(
    settings.apps.googlecalendar.clientId,
    settings.apps.googlecalendar.clientSecret,
    redirectUrl
  )

  const tokenReponse = await oAuth2Client.getToken(code)
  const accessToken = tokenReponse.tokens.access_token || ''

  const whoami = await oAuth2Client.getTokenInfo(accessToken)

  // Prepare secret config for storage
  const secretConfig: Office365SecretConfig = {
    accessToken,
    refreshToken: tokenReponse.tokens.refresh_token || '',
    expiryDate: tokenReponse.tokens.expiry_date || 0,
    scope: tokenReponse.tokens.scope || '',
    subscriptions: [],
  }

  // Prepare general config for storage
  const config: AppCalendarConfig = {
    email: whoami.email || '',
    availabilityCalendars: [],
    orgsCalendars: [],
  }

  await adminRequest(CREATE_USER_APP, {
    values: {
      userId,
      type: App_Type_Enum.GoogleCalendar,
      secretConfig,
      config,
    },
  })
})
