import { App_Type_Enum, gql } from '@gql'
import settings from '@settings'
import { Office365Config, Office365SecretConfig } from '@shared/model/user_app'
import { adminRequest } from '@utils/adminRequest'
import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { RouteError, route } from '@utils/route'
import * as yup from 'yup'

const scopes = ['offline_access', 'Calendars.Read', 'Calendars.ReadWrite']

const yupSchema = yup.object().shape({
  code: yup.string().required(),
})

export default route(async (context) => {
  const userId = guardAuth(context)
  const { code } = guardBodyParams(context, yupSchema)

  // Get access and refresh token
  const tokenResponse = await fetch(
    'https://login.microsoftonline.com/common/oauth2/v2.0/token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: settings.apps.office365.clientId,
        client_secret: settings.apps.office365.clientSecret,
        code,
        scope: scopes.join(' '),
        // Redirect url is required even if we don't use it after the query
        redirect_uri: `${settings.url}/apps/office365-auth-redirect`,
      }),
    }
  )

  const responseBody = await tokenResponse.json()

  if (!tokenResponse.ok) {
    throw new RouteError(
      500,
      'An error occurred: ' + JSON.stringify(responseBody)
    )
  }

  // Get user info
  const whoamiResponse = await fetch('https://graph.microsoft.com/v1.0/me', {
    headers: { Authorization: 'Bearer ' + responseBody.access_token },
  })
  const whoami = await whoamiResponse.json()

  // Prepare secret config for storage
  const secretConfig: Office365SecretConfig = {
    accessToken: responseBody.access_token,
    refreshToken: responseBody.refresh_token,
    expiryDate: Math.round(+new Date() / 1000 + responseBody.expires_in),
    scope: responseBody.scope,
  }

  // Prepare general config for storage
  const config: Office365Config = {
    email: whoami.mail ?? whoami.userPrincipalName,
    availabilityCalendars: [],
    orgsCalendars: [],
  }

  await adminRequest(CREATE_USER_APP, {
    values: {
      userId,
      type: App_Type_Enum.Office365,
      secretConfig,
      config,
    },
  })
})

const CREATE_USER_APP = gql(`
  mutation createUserApp($values: user_app_insert_input!) {
    insert_user_app_one(object: $values) {
      id
    }
  }
`)
