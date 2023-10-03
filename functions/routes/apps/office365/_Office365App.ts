import type {
  Calendar as OfficeCalendar,
  Event as OfficeEvent,
} from '@microsoft/microsoft-graph-types-beta'
import settings from '@settings'
import { truthy } from '@shared/helpers/truthy'
import {
  Calendar,
  CalendarApp,
  Office365Config,
  Office365SecretConfig,
  OrgCalendarConfig,
} from '@shared/model/user_app'
import { transformRRuleToRecurrence } from '@utils/msgraph/transformRRuleToRecurrence'
import AbstractCalendarApp, { MeetingEvent } from '../_AbstractCalendarApp'

const graphApiUrl = 'https://graph.microsoft.com/v1.0'
const identifier = '#rolebase'

interface IRequest {
  id: string
  method: string
  url: string
  body?: Record<string, any>
}

interface ISettledResponse {
  id: string
  status: number
  headers: {
    'Retry-After': string
    'Content-Type': string
  }
  body: Record<string, any>
}

interface IBatchResponse {
  responses: ISettledResponse[]
}

export default class Office365App
  extends AbstractCalendarApp<Office365SecretConfig, Office365Config>
  implements CalendarApp
{
  public actions: Array<keyof Office365App> = [
    'uninstall',
    'listCalendars',
    'selectCalendars',
  ]

  public async uninstall() {
    await super.uninstall()

    // Disconnect all synchronized calendars
    for (const calendar of this.config.orgsCalendars) {
      await this.disconnectOrgCalendar(calendar)
    }
  }

  // List all user's calendars
  public async listCalendars(): Promise<Calendar[]> {
    const officeCalendars = await this.apiGetAllPages<OfficeCalendar>(
      '/me/calendars?$select=id,name,isDefaultCalendar,canEdit'
    )

    return officeCalendars.map((cal) => {
      const calendar: Calendar = {
        id: cal.id ?? 'No Id',
        name: cal.name ?? 'No calendar name',
        isDefault: cal.isDefaultCalendar ?? false,
        canEdit: cal.canEdit ?? false,
      }
      return calendar
    })
  }

  // Select calendars for availability and meetings
  public async selectCalendars(
    availabilityCalendars: string[],
    orgsCalendars: OrgCalendarConfig[]
  ) {
    if (
      orgsCalendars.some(
        (c) =>
          !availabilityCalendars.find(
            (calendarId) => calendarId === c.calendarId
          )
      )
    ) {
      throw new Error(
        'Orgs calendars must be included in availability calendars'
      )
    }

    const prevOrgsCalendars = this.config.orgsCalendars

    await this.updateConfig({
      availabilityCalendars,
      orgsCalendars,
    })

    // Enable/disable connections between calendars and orgs meetings
    for (const orgsCalendar of orgsCalendars) {
      const prevOrgCalendar = prevOrgsCalendars.find(
        (c) => c.calendarId === orgsCalendar.calendarId
      )
      if (prevOrgCalendar) {
        // Calendar already connected
        if (prevOrgCalendar.orgId === orgsCalendar.orgId) {
          // Same org, do nothing
          continue
        }

        // Different org, delete previous events
        await this.disconnectOrgCalendar(prevOrgCalendar)
      }
      await this.connectOrgCalendar(orgsCalendar)
    }
    for (const prevOrgCalendar of prevOrgsCalendars) {
      const orgsCalendar = orgsCalendars.find(
        (c) => c.calendarId === prevOrgCalendar.calendarId
      )
      if (!orgsCalendar) {
        // Calendar not connected anymore, delete events
        await this.disconnectOrgCalendar(prevOrgCalendar)
      }
    }
  }

  // Update/create a meeting (for Hasura trigger event)
  public async upsertMeeting(meetingEvent: MeetingEvent, prevDate?: string) {
    const orgCalendar = this.config.orgsCalendars.find(
      (c) => c.orgId === meetingEvent.orgId
    )
    if (!orgCalendar) return

    // Get event if it exists
    const existingEvent = await (meetingEvent.rrule
      ? this.retrieveRecurringMeetingEvent(meetingEvent.id, orgCalendar.orgId)
      : this.retrieveMeetingEvent(
          meetingEvent.id,
          orgCalendar.orgId,
          prevDate || meetingEvent.startDate
        ))

    // Update/Create event
    const event = await this.apiFetch<OfficeEvent>(
      `/me/calendars/${orgCalendar.calendarId}/events${
        existingEvent ? `/${existingEvent.id}` : ''
      }`,
      {
        method: existingEvent ? 'PATCH' : 'POST',
        body: JSON.stringify(this.transformMeetingEvent(meetingEvent)),
      }
    )

    // Delete instances of recurring events at exdates
    if (event.id && event.type === 'seriesMaster' && meetingEvent.exdates) {
      await this.deleteRecurringEventExdates([
        {
          eventId: event.id,
          exdates: meetingEvent.exdates,
        },
      ])
    }
  }

  // Delete a meeting (for Hasura trigger event)
  public async deleteMeeting(
    meetingId: string,
    orgId: string,
    date: string,
    recurrence?: boolean
  ) {
    const orgCalendar = this.config.orgsCalendars.find((c) => c.orgId === orgId)
    if (!orgCalendar) return

    // Get event if it exists
    const event = await (recurrence
      ? this.retrieveRecurringMeetingEvent(meetingId, orgId)
      : this.retrieveMeetingEvent(meetingId, orgId, date))
    if (event) {
      // Delete event
      await this.apiFetch(
        `/me/calendars/${orgCalendar.calendarId}/events/${event.id}`,
        {
          method: 'DELETE',
        }
      )
    }
  }

  // Delete an occurrence of a recurring meeting
  public async deleteRecurringMeetingOccurrence(
    meetingId: string,
    orgId: string,
    date: string
  ) {
    const event = await this.retrieveRecurringMeetingEvent(meetingId, orgId)
    if (!event?.id) return
    await this.deleteRecurringEventExdates([
      {
        eventId: event.id,
        exdates: [date],
      },
    ])
  }

  private async connectOrgCalendar(orgCalendar: OrgCalendarConfig) {
    await this.createCalendarEvents(orgCalendar)
    // TODO: start subscription
  }

  private async disconnectOrgCalendar(orgCalendar: OrgCalendarConfig) {
    await this.deleteCalendarEvents(orgCalendar.calendarId)
    // TODO: stop subscription
  }

  // Create events from Rolebase meetings
  private async createCalendarEvents(orgCalendar: OrgCalendarConfig) {
    const meetingsEvents = await this.getOrgMeetings(orgCalendar.orgId)
    if (!meetingsEvents.length) return

    // Create single and recurring events
    const eventsResponses = await this.apiBatch(
      meetingsEvents.map((meeting) => ({
        id: meeting.id,
        method: 'POST',
        url: `/me/calendars/${orgCalendar.calendarId}/events`,
        body: this.transformMeetingEvent(meeting),
      }))
    )

    // Fetch instances that need to be deleted
    await this.deleteRecurringEventExdates(
      eventsResponses
        .map((response) => {
          const recurringEvent = response.body as OfficeEvent
          if (!recurringEvent.id || !recurringEvent.recurrence) return
          const meetingEvent = meetingsEvents.find(
            (event) => event.id === response.id
          )
          if (!meetingEvent || !meetingEvent.exdates?.length) return
          return {
            eventId: recurringEvent.id,
            exdates: meetingEvent.exdates,
          }
        })
        .filter(truthy)
    )
  }

  // Delete all Rolebase events from a calendar
  private async deleteCalendarEvents(calendarId: string) {
    // Get Rolebase events from calendar
    const events = await this.apiGetAllPages<OfficeEvent>(
      `/me/calendars/${calendarId}/events?$filter=contains(subject, '${encodeURIComponent(
        identifier
      )}')&$select=id`
    )
    if (!events.length) return

    // Delete Rolebase events
    await this.apiBatch(
      events.map(({ id }) => ({
        id: id!,
        method: 'DELETE',
        url: `/me/events/${id!}`,
      }))
    )
  }

  // Get event of a meeting if it exists
  private async retrieveMeetingEvent(
    meetingId: string,
    orgId: string,
    date: string
  ): Promise<OfficeEvent | undefined> {
    const orgCalendar = this.config.orgsCalendars.find((c) => c.orgId === orgId)
    if (!orgCalendar) return

    // Search events 1 day before and after
    const searchStartDate = new Date(date)
    searchStartDate.setDate(searchStartDate.getDate() - 1)
    const searchEndDate = new Date(date)
    searchEndDate.setDate(searchEndDate.getDate() + 1)

    const events = await this.apiGetAllPages<OfficeEvent>(
      `/me/calendars/${
        orgCalendar.calendarId
      }/events?$filter=type eq 'singleInstance' and start/dateTime gt '${searchStartDate.toISOString()}' and start/dateTime lt '${searchEndDate.toISOString()}' and contains(subject, '${encodeURIComponent(
        identifier
      )}')`
    )

    // Find event with meeting id
    return events.find((event) => event.body?.content?.includes(meetingId))
  }

  // Get event of a meeting if it exists
  private async retrieveRecurringMeetingEvent(
    meetingId: string,
    orgId: string
  ): Promise<OfficeEvent | undefined> {
    const orgCalendar = this.config.orgsCalendars.find((c) => c.orgId === orgId)
    if (!orgCalendar) return

    const events = await this.apiGetAllPages<OfficeEvent>(
      `/me/calendars/${
        orgCalendar.calendarId
      }/events?$filter=type eq 'seriesMaster' and contains(subject, '${encodeURIComponent(
        identifier
      )}')`
    )

    // Find event with meeting id
    return events.find((event) => event.body?.content?.includes(meetingId))
  }

  // Delete instances of recurring events at exdates
  private async deleteRecurringEventExdates(
    eventsExdates: Array<{
      eventId: string
      exdates: string[]
    }>
  ) {
    if (eventsExdates.length === 0) return

    // Fetch instances that need to be deleted
    const instancesResponses = await this.apiBatch(
      eventsExdates.flatMap(({ eventId, exdates }) =>
        exdates.map((date, i) => ({
          id: `${eventId}${i}`,
          method: 'GET',
          url: `/me/events/${eventId}/instances?startDateTime=${date}&endDateTime=${date}&$select=id`,
        }))
      )
    )

    // Delete all found instances
    await this.apiBatch(
      instancesResponses
        .map((response) => {
          const id = response?.body?.value?.[0]?.id
          if (!id) return
          return {
            id,
            method: 'DELETE',
            url: `/me/events/${id}`,
          }
        })
        .filter(truthy)
    )
  }

  // Create events from Rolebase meetings
  private transformMeetingEvent(event: MeetingEvent): OfficeEvent {
    return {
      subject: `${event.role} - ${event.title} ${identifier}`,
      body: {
        contentType: 'html',
        content:
          `Notes : <a href="${event.url}">${event.url}</a>` +
          (event.videoConf
            ? `<br /><br />Visio : <a href="${event.videoConf}">${event.videoConf}</a>`
            : ''),
      },
      start: {
        dateTime: event.startDate.substring(0, 19),
        timeZone: event.timezone || 'UTC',
      },
      end: {
        dateTime: event.endDate.substring(0, 19),
        timeZone: event.timezone || 'UTC',
      },
      recurrence: transformRRuleToRecurrence(event.rrule),
    }
  }

  // Get access token, refresh it if needed
  private async getAccessToken(): Promise<string> {
    const isExpired =
      this.secretConfig.expiryDate < Math.round(+new Date() / 1000)
    if (isExpired) this.refreshAccessToken()

    return this.secretConfig.accessToken
  }

  // Refresh access token
  private async refreshAccessToken() {
    const response = await fetch(
      'https://login.microsoftonline.com/common/oauth2/v2.0/token',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: settings.apps.office365.clientId,
          client_secret: settings.apps.office365.clientSecret,
          refresh_token: this.secretConfig.refreshToken,
          grant_type: 'refresh_token',
          scope: this.secretConfig.scope,
        }),
      }
    )
    if (!response.ok) {
      throw new Error('Error while refreshing access token')
    }
    const responseJson = await this.parseResponse<any>(response)

    const secretConfigChanges = {
      accessToken: responseJson.access_token,
      refreshToken: responseJson.refresh_token,
      expiryDate: Math.round(+new Date() / 1000 + responseJson.expires_in),
    }
    this.updateSecretConfig(secretConfigChanges)
  }

  private async apiFetch<T>(
    path: string,
    init?: any // RequestInit | undefined
  ): Promise<T> {
    // console.log(`${init?.method || 'GET'} ${path}`, JSON.stringify(init))
    let tries = 0
    const maxTries = 5
    while (tries < maxTries) {
      const accessToken = await this.getAccessToken()
      const response = await fetch(`${graphApiUrl}${path}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        ...init,
      })

      if (response.ok) {
        return this.parseResponse<T>(response)
      }

      if (response.status === 429) {
        // Too many requests, retry after X seconds
        const timeout = (Number(response.headers['Retry-After']) || 2) * 1000
        await new Promise((resolve) => setTimeout(resolve, timeout))
        tries++
      } else if (response.status === 401) {
        // Unauthorized, refresh token
        await this.refreshAccessToken()
        tries++
      } else {
        throw new Error(
          `API fetch error ${path} => status ${response.status} ${response.statusText}`
        )
      }
    }
    throw new Error('Too many retries')
  }

  private async apiGetAllPages<T>(path: string): Promise<T[]> {
    const rows: T[] = []
    let isDone = false

    // List calendars with pagination
    while (!isDone) {
      const response = await this.apiFetch<{
        value: T[]
        '@odata.nextLink'?: string
      }>(path)

      if (!response.value) {
        throw new Error('No value in response body ' + JSON.stringify(response))
      }
      rows.push(...response.value)

      if (response['@odata.nextLink']) {
        path = response['@odata.nextLink'].replace(graphApiUrl, '')
      } else {
        isDone = true
      }
    }

    return rows
  }

  private async apiBatch(requests: IRequest[]): Promise<ISettledResponse[]> {
    const maxPerBatch = 20
    const nBatches = Math.ceil(requests.length / maxPerBatch)
    const responses: ISettledResponse[] = []

    for (let i = 0; i < nBatches; i++) {
      const batchRequests = requests.slice(
        i * maxPerBatch,
        i * maxPerBatch + maxPerBatch
      )

      const response = await this.apiFetch<IBatchResponse>(`/$batch`, {
        method: 'POST',
        body: JSON.stringify({
          requests: batchRequests.map((request) => ({
            ...request,
            headers: {
              'Content-Type': 'application/json',
            },
          })),
        }),
      })
      responses.push(...response.responses)
    }

    return responses
  }

  private async parseResponse<Type>(response: Response): Promise<Type> {
    if (response.headers.get('content-encoding') === 'gzip') {
      const responseText = await response.text()
      return new Promise((resolve) => resolve(JSON.parse(responseText)))
    }

    if (response.status === 204) {
      return new Promise((resolve) => resolve({} as Type))
    }

    if (!response.ok && (response.status < 200 || response.status >= 300)) {
      response.json().then(console.log)
      throw Error(response.statusText)
    }

    return response.json()
  }
}
