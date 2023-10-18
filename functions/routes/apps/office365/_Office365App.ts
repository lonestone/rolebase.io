import { MeetingFragment } from '@gql'
import type {
  Calendar as OfficeCalendar,
  Event as OfficeEvent,
  Subscription,
} from '@microsoft/microsoft-graph-types-beta'
import settings from '@settings'
import { getDateFromUTCDate } from '@shared/helpers/rrule'
import { truthy } from '@shared/helpers/truthy'
import {
  Calendar,
  CalendarApp,
  Office365Config,
  Office365SecretConfig,
  OrgCalendarConfig,
} from '@shared/model/user_app'
import { isDateTimeEqual } from '@utils/msgraph/isDateTimeEqual'
import { isRecurrenceEqual } from '@utils/msgraph/isRecurrenceEqual'
import { transformRRuleToRecurrence } from '@utils/msgraph/transformRRuleToRecurrence'
import AbstractCalendarApp, { MeetingEvent } from '../_AbstractCalendarApp'

const graphApiUrl = 'https://graph.microsoft.com/v1.0'

interface APIRequest {
  id: string
  method: string
  url: string
  body?: Record<string, any>
}

interface APISettledResponse {
  id: string
  status: number
  headers: {
    'Retry-After': string
    'Content-Type': string
  }
  body: Record<string, any>
}

interface APIBatchResponse {
  responses: APISettledResponse[]
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

    return officeCalendars.map(
      (cal): Calendar => ({
        id: cal.id ?? 'No Id',
        name: cal.name ?? 'No calendar name',
        isDefault: cal.isDefaultCalendar ?? false,
        canEdit: cal.canEdit ?? false,
      })
    )
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
    for (const orgCalendar of orgsCalendars) {
      const prevOrgCalendar = prevOrgsCalendars.find(
        (c) => c.calendarId === orgCalendar.calendarId
      )
      if (prevOrgCalendar) {
        // Calendar already connected
        if (prevOrgCalendar.orgId === orgCalendar.orgId) {
          // Same org, do nothing
          continue
        }

        // Different org, delete previous events
        await this.disconnectOrgCalendar(prevOrgCalendar)
      }
      await this.connectOrgCalendar(orgCalendar)
    }
    for (const prevOrgCalendar of prevOrgsCalendars) {
      const orgCalendar = orgsCalendars.find(
        (c) => c.calendarId === prevOrgCalendar.calendarId
      )
      if (!orgCalendar) {
        // Calendar not connected anymore, delete events
        await this.disconnectOrgCalendar(prevOrgCalendar)
      }
    }
  }

  // Update/create a meeting (for Hasura trigger event)
  public async upsertMeetingEvent(
    meetingEvent: MeetingEvent,
    prevDate?: string
  ) {
    const orgCalendar = this.config.orgsCalendars.find(
      (c) => c.orgId === meetingEvent.orgId
    )
    if (!orgCalendar) return

    // Fix subscription if missing
    // We call this function here because it's cheap
    // and it happens at a user interaction
    await this.fixMissingSubscription(orgCalendar.calendarId)

    // Get event if it exists
    const existingEvent = await (meetingEvent.rrule
      ? this.retrieveRecurringMeetingEvent(meetingEvent.id, orgCalendar.orgId)
      : this.retrieveMeetingEvent(
          meetingEvent.id,
          orgCalendar.orgId,
          prevDate || meetingEvent.startDate
        ))

    // Update/Create event
    const eventPayload = this.transformMeetingEvent(meetingEvent)
    if (!existingEvent) {
      eventPayload.transactionId = `rolebase-${meetingEvent.id}`
    }

    const event = await this.apiFetch<OfficeEvent>(
      `/me/calendars/${orgCalendar.calendarId}/events${
        existingEvent ? `/${existingEvent.id}` : ''
      }`,
      {
        method: existingEvent ? 'PATCH' : 'POST',
        body: JSON.stringify(eventPayload),
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
  public async deleteMeetingEvent(
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

  public async onEventCreated(eventId: string, subscriptionId: string) {
    //   const { orgId } = this.getCalendarAndOrgIdFromSubscriptionId(subscriptionId)
    //   // Get event
    //   const event = await this.apiFetch<OfficeEvent>(`/me/events/${eventId}`)
    //   // Skip if last modification was from Rolebase
    //   if (/rolebase-/.test(event.transactionId || '')) {
    //     console.log(`Event from Rolebase ${event.id}`)
    //     return
    //   }
    //   if (event.recurrence) {
    //     // Ignore recurring events
    //     return
    //   }
    //   if (!event.subject || !event.start?.dateTime || !event.end?.dateTime) {
    //     return
    //   }
    //   // Try to create meeting from event
    //   await this.tryCreateMeeting({
    //     orgId,
    //     subject: event.subject,
    //     startDate: event.start?.dateTime,
    //     endDate: event.end?.dateTime,
    //     timezone: event.start?.timeZone ?? undefined,
    //   })
  }

  public async onEventUpdated(eventId: string, subscriptionId: string) {
    const orgCalendar = this.getOrgCalendarBySubscriptionId(subscriptionId)
    if (!orgCalendar) return
    const { orgId } = orgCalendar

    // Get event
    const event = await this.apiFetch<OfficeEvent>(`/me/events/${eventId}`)
    if (!event?.body?.content) {
      // No event body content
      return
    }

    const meetingChanges: Partial<MeetingFragment> = {}
    const resetChanges: Partial<OfficeEvent> = {}

    if (event.type === 'seriesMaster' && event.recurrence) {
      // Get meeting id from event body content
      const meetingRecurringId = this.findMeetingRecurringIdInContent(
        event.body.content
      )

      if (!meetingRecurringId) {
        // No meeting id found in event body content
        return
      }

      const meetingRecurring = await this.getMeetingRecurringById(
        meetingRecurringId,
        orgId
      )
      if (!meetingRecurring) {
        // No recurring meeting found
        return
      }

      const recurringMeetingEvent = this.transformMeetingEvent(meetingRecurring)

      // We can't edit a recurring event, we reset the changed props
      if (recurringMeetingEvent.subject !== event.subject) {
        resetChanges.subject = recurringMeetingEvent.subject
      }
      if (
        !isRecurrenceEqual(recurringMeetingEvent.recurrence, event.recurrence)
      ) {
        resetChanges.recurrence = recurringMeetingEvent.recurrence
      }
      if (!isDateTimeEqual(recurringMeetingEvent.start, event.start)) {
        resetChanges.start = recurringMeetingEvent.start
      }
      if (!isDateTimeEqual(recurringMeetingEvent.end, event.end)) {
        resetChanges.end = recurringMeetingEvent.end
      }

      // We are notified when an occurrence is deleted or an exception is created
      // but we don't know what have changed, so we need to reset occurrences and exceptions
      if (resetChanges.start || resetChanges.end || resetChanges.recurrence) {
        // Exceptions are reset when recurrence changes
      } else {
        // Fix event
        await this.fixRecurringEvent(eventId, meetingRecurring)
        // Don't apply any other change
        return
      }
    } else if (event.type === 'singleInstance') {
      // Get meeting id from event body content
      const meetingId = this.findMeetingIdInContent(event.body.content)

      if (!meetingId) {
        // No meeting id found in event body content
        return
      }

      const meeting = await this.getMeetingById(meetingId, orgId)
      if (!meeting) {
        // No meeting found
        return
      }

      const meetingEvent = this.transformMeetingEvent(meeting)

      if (meetingEvent.subject !== event.subject) {
        resetChanges.subject = meetingEvent.subject
      }

      if (
        meetingEvent.start?.dateTime !== event.start?.dateTime?.substring(0, 19)
      ) {
        meetingChanges.startDate = event.start?.dateTime
      }
      if (
        meetingEvent.end?.dateTime !== event.end?.dateTime?.substring(0, 19)
      ) {
        meetingChanges.endDate = event.end?.dateTime
      }

      if (
        Object.keys(meetingChanges).length > 0 &&
        // If we reset some props, there will be a new notification
        Object.keys(resetChanges).length === 0 &&
        !event.recurrence
      ) {
        await this.updateMeeting(meetingId, meetingChanges)
      }
    }

    if (Object.keys(resetChanges).length > 0) {
      // Reset some props of event
      // Those props must be updated in Rolebase
      await this.apiFetch(`/me/events/${eventId}`, {
        method: 'PATCH',
        body: JSON.stringify(resetChanges),
      })
    }
  }

  public async onEventDeleted(eventId: string, subscriptionId: string) {
    // No action on delete
  }

  // When some notifications are missed
  // The simplest way to fix the calendar is to disconnect and reconnect it
  public async onSubscriptionMissed(subscriptionId: string) {
    // TMP TEST
    console.log(`Subscription ${subscriptionId} missed`)
    const orgCalendar = this.getOrgCalendarBySubscriptionId(subscriptionId)
    if (!orgCalendar) return

    await this.disconnectOrgCalendar(orgCalendar)
    await this.connectOrgCalendar(orgCalendar)
  }

  // When subscription is about to expire
  // We extend the subscription
  public async onSubscriptionReauthorizationRequired(subscriptionId: string) {
    // TMP TEST
    console.log(`Subscription ${subscriptionId} reauthorization required`)
    const orgCalendar = this.getOrgCalendarBySubscriptionId(subscriptionId)
    if (!orgCalendar) return

    await this.apiFetch(`/subscriptions/${subscriptionId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        expirationDateTime: new Date(
          Date.now() + 2 * 24 * 60 * 60 * 1000
        ).toISOString(),
      }),
    })
  }

  // When subscription is deleted
  // We recreate it
  public async onSubscriptionRemoved(subscriptionId: string) {
    // TMP TEST
    console.log(`Subscription ${subscriptionId} removed`)
    await this.onSubscriptionMissed(subscriptionId)
  }

  private async connectOrgCalendar(orgCalendar: OrgCalendarConfig) {
    // TMP TEST
    console.log(`Connecting calendar ${orgCalendar.calendarId}`)
    // Delete existing subscription
    for (const { id, calendarId } of this.secretConfig.subscriptions) {
      if (calendarId !== orgCalendar.calendarId) continue
      await this.deleteSubscription(id)
    }

    // Create all events
    await this.createCalendarEvents(orgCalendar)

    // Start new subscription
    const subscription = await this.createSubscription(orgCalendar.calendarId)

    if (subscription.id) {
      // Update secret config
      await this.updateSecretConfig({
        subscriptions: this.secretConfig.subscriptions
          .filter((s) => s.calendarId !== orgCalendar.calendarId)
          .concat({
            id: subscription.id,
            calendarId: orgCalendar.calendarId,
          }),
      })
    }
  }

  private async disconnectOrgCalendar(orgCalendar: OrgCalendarConfig) {
    // TMP TEST
    console.log(`Disconnecting calendar ${orgCalendar.calendarId}`)
    // Stop subscription (there shouldn't be more than one, but hey, who knows)
    for (const { id, calendarId } of this.secretConfig.subscriptions) {
      if (calendarId !== orgCalendar.calendarId) continue
      await this.deleteSubscription(id)
    }

    // Update secret config
    await this.updateSecretConfig({
      subscriptions: this.secretConfig.subscriptions.filter(
        (s) => s.calendarId !== orgCalendar.calendarId
      ),
    })

    // Delete all Rolebase events from calendar
    await this.deleteCalendarEvents(orgCalendar.calendarId)
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
        body: {
          ...this.transformMeetingEvent(meeting),
          transactionId: `rolebase-${meeting.id}`,
        },
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
        this.identifier
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
        this.identifier
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
        this.identifier
      )}')`
    )

    // Find event with meeting id
    return events.find((event) => event.body?.content?.includes(meetingId))
  }

  // Delete occurrences of recurring events at exdates
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
          url: `/me/events/${eventId}/instances?$filter=type eq 'occurrence'&startDateTime=${date}&endDateTime=${date}&$select=id`,
        }))
      )
    )
    const eventsIds = instancesResponses
      .map((response) => response?.body?.value?.[0]?.id)
      .filter(truthy)
    if (eventsIds.length === 0) return

    // Delete all found instances
    await this.apiBatch(
      eventsIds.map((id) => ({
        id,
        method: 'DELETE',
        url: `/me/events/${id}`,
      }))
    )
  }

  // Fix occurrences and exceptions in a recurring event
  private async fixRecurringEvent(eventId: string, meetingEvent: MeetingEvent) {
    if (!meetingEvent.rrule) return

    // Range of dates to fix
    const startDate = new Date()
    startDate.setMonth(startDate.getMonth() - 1)
    const endDate = new Date()
    endDate.setMonth(endDate.getMonth() + 3)

    // Get all existing occurrences and exceptions
    const events = await this.apiGetAllPages<OfficeEvent>(
      `/me/events/${eventId}/instances?$filter=type eq 'occurrence' or type eq 'exception'&startDateTime=${startDate.toISOString()}&endDateTime=${endDate.toISOString()}&$select=id,type,start`
    )

    const occurrences = meetingEvent.rrule
      .between(startDate, endDate, true)
      .map((date) => getDateFromUTCDate(date).toISOString())
    const requests: APIRequest[] = []

    for (const event of events) {
      if (!event.id || !event.start?.dateTime) continue
      const date = new Date(event.start.dateTime).toISOString()

      // Delete occurrences at exdates and all exceptions
      if (
        (event.type === 'occurrence' && meetingEvent.exdates?.includes(date)) ||
        event.type === 'exception'
      ) {
        requests.push({
          id: event.id,
          method: 'DELETE',
          url: `/me/events/${event.id}`,
        })
      } else {
        const occurrenceIndex = occurrences.indexOf(date)
        if (occurrenceIndex !== -1) {
          // Remove occurrence from list
          occurrences.splice(occurrenceIndex, 1)
        }
      }
    }

    // Create missing occurrences
    const hasMissingOccurrences = occurrences.some(
      (occurrence) => !meetingEvent.exdates?.includes(occurrence)
    )

    if (hasMissingOccurrences) {
      // We can't create occurrences, so we delete the event
      // and we recreate it
      await this.apiFetch(`/me/events/${eventId}`, {
        method: 'DELETE',
      })
      await this.upsertMeetingEvent(meetingEvent)
    } else {
      // Fix occurrences and exceptions
      await this.apiBatch(requests)
    }
  }

  // Create events from Rolebase meetings
  private transformMeetingEvent(event: MeetingEvent): OfficeEvent {
    return {
      subject: `${event.role} - ${event.title} ${this.identifier}`,
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

  private async createSubscription(calendarId: string): Promise<Subscription> {
    return this.apiFetch<Subscription>('/subscriptions', {
      method: 'POST',
      body: JSON.stringify({
        changeType: 'created,updated',
        notificationUrl: `${settings.functionsUrl}/routes/apps/office365/notify`,
        lifecycleNotificationUrl: `${settings.functionsUrl}/routes/apps/office365/notify`,
        resource: `/me/calendars/${calendarId}/events`,
        expirationDateTime: new Date(
          Date.now() + 2 * 24 * 60 * 60 * 1000
        ).toISOString(),
        clientState: this.userApp.id,
      } as Subscription),
    })
  }

  private async deleteSubscription(subscriptionId: string) {
    await this.apiFetch(`/subscriptions/${subscriptionId}`, {
      method: 'DELETE',
    })
  }

  // If subscription is missing, create it
  // It shouldn't happen, but we observed it can happen when a timeout occurs
  private async fixMissingSubscription(calendarId: string) {
    // TMP TEST
    console.log(`Fixing missing subscription for calendar ${calendarId}`)
    if (
      this.secretConfig.subscriptions.some((s) => s.calendarId === calendarId)
    ) {
      return
    }
    const subscription = await this.createSubscription(calendarId)
    if (subscription.id) {
      // Update secret config
      await this.updateSecretConfig({
        subscriptions: this.secretConfig.subscriptions.concat({
          id: subscription.id,
          calendarId,
        }),
      })
    }
  }

  private getOrgCalendarBySubscriptionId(
    subscriptionId: string
  ): OrgCalendarConfig | undefined {
    // Get calendar id from subscription id
    const calendarId = this.secretConfig.subscriptions.find(
      (s) => s.id === subscriptionId
    )?.calendarId
    if (!calendarId) return

    // Get config from calendar id
    return this.config.orgsCalendars.find((c) => c.calendarId === calendarId)
  }

  // Get access token, refresh it if needed
  private async getAccessToken(): Promise<string> {
    const isExpired =
      this.secretConfig.expiryDate < Math.round(+new Date() / 1000)
    if (isExpired) await this.refreshAccessToken()

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
    const responseJson = await response.json()

    const secretConfigChanges = {
      accessToken: responseJson.access_token,
      refreshToken: responseJson.refresh_token,
      expiryDate: Math.round(+new Date() / 1000 + responseJson.expires_in),
    }
    await this.updateSecretConfig(secretConfigChanges)
  }

  private async apiFetch<T>(
    path: string,
    init?: Record<string, any>
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

      if (response.status === 204 || response.status === 404) {
        // Return empty
        return {} as T
      } else if (response.ok) {
        // Parse JSON response
        return response.json()
      } else if (response.status === 429) {
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

  private async apiBatch(
    requests: APIRequest[]
  ): Promise<APISettledResponse[]> {
    const maxPerBatch = 20
    const nBatches = Math.ceil(requests.length / maxPerBatch)
    const responses: APISettledResponse[] = []

    for (let i = 0; i < nBatches; i++) {
      const batchRequests = requests.slice(
        i * maxPerBatch,
        i * maxPerBatch + maxPerBatch
      )

      const response = await this.apiFetch<APIBatchResponse>(`/$batch`, {
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
}
