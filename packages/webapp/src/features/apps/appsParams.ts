import { fn } from '@/common/api/functions'
import { App_Type_Enum } from '@gql'
import React from 'react'
import settings from 'src/settings'
import GoogleCalendarIcon from './images/googlecalendar.svg'
import Office365Icon from './images/office365.svg'

const appsUrl = `${settings.url}/apps`

const appsParams: Record<App_Type_Enum, AppParams> = {
  // Office 365
  [App_Type_Enum.Office365]: {
    icon: Office365Icon,
    authUrl: `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?response_type=code&scope=${[
      'User.Read',
      'Calendars.Read',
      'Calendars.ReadWrite',
      'offline_access',
    ].join(' ')}&client_id=${
      settings.apps.office365.clientId
    }&redirect_uri=${appsUrl}/office365-auth-redirect`,
    redirectFunction: fn('apps/office365/auth-redirect'),
  },

  // Google Calendar
  [App_Type_Enum.GoogleCalendar]: {
    icon: GoogleCalendarIcon,
    authUrl: `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&scope=${[
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/calendar.readonly',
      'https://www.googleapis.com/auth/calendar.events',
    ].join(' ')}&prompt=consent&access_type=offline&client_id=${
      settings.apps.googlecalendar.clientId
    }&redirect_uri=${appsUrl}/googlecalendar-auth-redirect`,
    redirectFunction: fn('apps/googlecalendar/auth-redirect'),
  },
}

interface AppParams {
  icon: React.ElementType
  authUrl: string
  redirectFunction: ReturnType<typeof fn<{ code: string }>>
}

export default appsParams
