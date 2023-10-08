export interface Calendar {
  id: string
  name: string
  isDefault: boolean
  canEdit: boolean
}

// Interface of CalendarApp classes extending AbstractCalendarApp
// Used in front for RPC calls
export interface CalendarApp {
  uninstall(): Promise<void>
  listCalendars(): Promise<Calendar[]>
  selectCalendars(
    availabilityCalendars: string[],
    orgsCalendars: OrgCalendarConfig[]
  ): Promise<void>
}

export interface OrgCalendarConfig {
  orgId: string
  calendarId: string
}

export interface Office365SecretConfig {
  accessToken: string
  refreshToken: string
  expiryDate: number // Unix timestamp
  scope: string
  subscriptions: Office365Subscription[]
}

export interface Office365Config {
  email: string
  availabilityCalendars: string[]
  orgsCalendars: OrgCalendarConfig[]
}

export interface Office365Subscription {
  id: string
  calendarId: string
}
