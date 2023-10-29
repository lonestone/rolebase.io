import { MeetingFragment } from '@gql'
import type {
  Calendar as OfficeCalendar,
  Event as OfficeEvent,
  Subscription,
} from '@microsoft/microsoft-graph-types-beta'
import settings from '@settings'
import { dateToTimeZone } from '@shared/helpers/rrule'
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
import { sha1 } from '@utils/sha1'
import AbstractCalendarApp, { MeetingEvent } from '../_AbstractCalendarApp'

const graphApiUrl = 'https://graph.microsoft.com/v1.0'
const debug = false

// Extended properties
const orgIdProp =
  'String {40c4556b-332e-4207-abcc-ef975c3c5da7} Name RolebaseOrgId'
const meetingIdProp =
  'String {802bbf56-1de9-40ee-83dd-685d727d051d} Name RolebaseMeetingId'
const hashProp =
  'String {53052a96-5ee8-4b27-8a9d-f851fa988ba2} Name RolebaseHash'

// Filters query parts
const filterOrgId = (orgId: string) =>
  `singleValueExtendedProperties/Any(ep: ep/id eq '${orgIdProp}' and ep/value eq '${orgId}')`
const filterMeetingId = (meetingId: string) =>
  `singleValueExtendedProperties/Any(ep: ep/id eq '${meetingIdProp}' and ep/value eq '${meetingId}')`

// Types
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
  public async upsertMeetingEvent(meetingEvent: MeetingEvent) {
    const orgCalendar = this.config.orgsCalendars.find(
      (c) => c.orgId === meetingEvent.orgId
    )
    if (!orgCalendar) return

    // Fix subscription if missing
    // We call this function here because it's cheap
    // and it happens at a user interaction
    await this.fixMissingSubscription(orgCalendar.calendarId)

    // Get event if it exists
    const existingEvent = await this.fetchMeetingEvent(
      meetingEvent.id,
      orgCalendar.calendarId
    )

    // Update/Create event
    const eventPayload = await this.transformMeetingEvent(meetingEvent)

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
  public async deleteMeetingEvent(meetingId: string, orgId: string) {
    const orgCalendar = this.config.orgsCalendars.find((c) => c.orgId === orgId)
    if (!orgCalendar) return

    // Get event if it exists
    const event = await this.fetchMeetingEvent(
      meetingId,
      orgCalendar.calendarId
    )
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
    const orgCalendar = this.config.orgsCalendars.find((c) => c.orgId === orgId)
    if (!orgCalendar) return

    const event = await this.fetchMeetingEvent(
      meetingId,
      orgCalendar.calendarId
    )
    if (!event?.id || !event.recurrence) return

    await this.deleteRecurringEventExdates([
      {
        eventId: event.id,
        exdates: [date],
      },
    ])
  }

  public async onEventCreated(eventId: string, subscriptionId: string) {
    // No action on creation
  }

  public async onEventUpdated(eventId: string, subscriptionId: string) {
    const orgCalendar = this.getOrgCalendarBySubscriptionId(subscriptionId)
    if (!orgCalendar) return
    const { orgId } = orgCalendar

    // Get event
    const event = await this.apiFetch<OfficeEvent>(
      `/me/events/${eventId}?$expand=singleValueExtendedProperties($filter=id eq '${hashProp}' or id eq '${meetingIdProp}')`
    )
    if (!event?.body?.content) {
      // No event body content
      return
    }

    const meetingChanges: Partial<MeetingFragment> = {}
    const resetChanges: Partial<OfficeEvent> = {}

    // Get meeting (or recurring meeting) id from extended properties of event
    const meetingId = event.singleValueExtendedProperties?.find(
      (prop) => prop.id === meetingIdProp
    )?.value
    const hash = event.singleValueExtendedProperties?.find(
      (prop) => prop.id === hashProp
    )?.value

    if (!meetingId) {
      // Event is not linked to a Rolebase meeting or recurring meeting
      return
    }

    if (event.type === 'seriesMaster' && event.recurrence) {
      // Get recurring meeting from database
      const meetingRecurring = await this.getMeetingRecurringById(
        meetingId,
        orgId
      )
      if (!meetingRecurring) {
        // No recurring meeting found
        return
      }

      const recurringMeetingEvent =
        await this.transformMeetingEvent(meetingRecurring)

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
      // Skip if hash is right (event was updated by this app)
      const newHash = await this.generateHash(event)
      if (hash === newHash) return

      // Get meeting from database
      const meeting = await this.getMeetingById(meetingId, orgId)
      if (!meeting) {
        // No meeting found
        return
      }

      const meetingEvent = await this.transformMeetingEvent(meeting)

      if (meetingEvent.subject !== event.subject) {
        resetChanges.subject = meetingEvent.subject
      }
      if (
        event.start?.dateTime &&
        meetingEvent.start?.dateTime !== event.start.dateTime.substring(0, 19)
      ) {
        meetingChanges.startDate = event.start.timeZone
          ? dateToTimeZone(
              new Date(event.start.dateTime),
              event.start.timeZone,
              true
            ).toISOString()
          : event.start.dateTime
      }
      if (
        event.end?.dateTime &&
        meetingEvent.end?.dateTime !== event.end?.dateTime?.substring(0, 19)
      ) {
        meetingChanges.endDate = event.end.timeZone
          ? dateToTimeZone(
              new Date(event.end.dateTime),
              event.end.timeZone,
              true
            ).toISOString()
          : event.end.dateTime
      }

      if (
        Object.keys(meetingChanges).length > 0 &&
        // If we reset some props, there will be a new notification
        Object.keys(resetChanges).length === 0
      ) {
        // Update meeting in database
        await this.updateMeeting(meetingId, meetingChanges)

        // Update hash in event to skip next notification
        resetChanges.singleValueExtendedProperties = [
          { id: hashProp, value: newHash },
        ]
      }
    }

    if (Object.keys(resetChanges).length > 0) {
      // Reset some props of event
      await this.apiFetch(`/me/events/${eventId}`, {
        method: 'PATCH',
        body: JSON.stringify(resetChanges),
      })
    }
  }

  public async onEventDeleted(eventId: string, subscriptionId: string) {
    // No action on delete
  }

  public async onSubscriptionMissed(subscriptionId: string) {
    // No action on subscription missed
  }

  // When subscription is about to expire
  // We extend the subscription
  public async onSubscriptionReauthorizationRequired(subscriptionId: string) {
    if (debug) {
      console.log(
        `[App ${this.userApp.id}] Subscription ${subscriptionId} reauthorization required`
      )
    }
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

  // When subscription is deleted, we recreate it
  // We may lose some notifications and the solution would be to delete all events and recreate them
  // but it's cheaper like that.
  public async onSubscriptionRemoved(subscriptionId: string) {
    if (debug) {
      console.log(
        `[App ${this.userApp.id}] Subscription ${subscriptionId} removed`
      )
    }
    const orgCalendar = this.getOrgCalendarBySubscriptionId(subscriptionId)
    if (!orgCalendar) return

    // Delete then recreate subscription
    await this.deleteSubscription(subscriptionId)
    const subscription = await this.createSubscription(orgCalendar.calendarId)

    // Update secret config
    if (subscription?.id) {
      await this.updateSecretConfig({
        subscriptions: this.secretConfig.subscriptions
          .filter((s) => s.id !== subscriptionId)
          .concat({
            id: subscription.id,
            calendarId: orgCalendar.calendarId,
          }),
      })
    }
  }

  // Create events and subscription for a calendar
  private async connectOrgCalendar(orgCalendar: OrgCalendarConfig) {
    if (debug) {
      console.log(
        `[App ${this.userApp.id}] Connecting calendar ${orgCalendar.calendarId}`
      )
    }
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

  // Delete events and subscription for a calendar
  private async disconnectOrgCalendar(orgCalendar: OrgCalendarConfig) {
    if (debug) {
      console.log(
        `[App ${this.userApp.id}] Disconnecting calendar ${orgCalendar.calendarId}`
      )
    }
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
    await this.deleteCalendarEvents(orgCalendar)
  }

  // Create events from Rolebase meetings
  private async createCalendarEvents(orgCalendar: OrgCalendarConfig) {
    const meetingsEvents = await this.getOrgMeetings(orgCalendar.orgId)
    if (!meetingsEvents.length) return

    // Create single and recurring events
    const eventsResponses = await this.apiBatch(
      await Promise.all(
        meetingsEvents.map(async (meeting) => ({
          id: meeting.id,
          method: 'POST',
          url: `/me/calendars/${orgCalendar.calendarId}/events`,
          body: await this.transformMeetingEvent(meeting),
        }))
      )
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
  private async deleteCalendarEvents(orgCalendar: OrgCalendarConfig) {
    // Get Rolebase events from calendar
    const events = await this.apiGetAllPages<OfficeEvent>(
      `/me/calendars/${orgCalendar.calendarId}/events?$filter=${filterOrgId(
        orgCalendar.orgId
      )}&$select=id`
    )
    if (!events.length) return

    // Delete Rolebase events
    await this.apiBatch(
      events.map(({ id }, i) => ({
        id: i.toString(), // Ensure unicity (id is not always unique)
        method: 'DELETE',
        url: `/me/events/${id!}`,
      }))
    )
  }

  // Migrate legacy calendars
  // (remove this function after execution)
  public async migrateLegacyCalendars() {
    for (const orgCalendar of this.config.orgsCalendars) {
      await this.deleteLegacyCalendarEvents(orgCalendar.calendarId)
      await this.deleteCalendarEvents(orgCalendar)
      await this.createCalendarEvents(orgCalendar)
    }
  }

  private async deleteLegacyCalendarEvents(calendarId: string) {
    // Get Rolebase events from calendar
    const events = await this.apiGetAllPages<OfficeEvent>(
      `/me/calendars/${calendarId}/events?$filter=contains(subject, '${encodeURIComponent(
        '#rolebase'
      )}')&$select=id`
    )
    if (!events.length) return

    // Delete Rolebase events
    await this.apiBatch(
      events.map(({ id }, i) => ({
        id: i.toString(), // Ensure unicity (id is not always unique)
        method: 'DELETE',
        url: `/me/events/${id!}`,
      }))
    )
  }

  // Get event of a meeting if it exists
  private async fetchMeetingEvent(
    meetingId: string,
    calendarId: string
  ): Promise<OfficeEvent | undefined> {
    const { value: events } = await this.apiFetch<{ value: OfficeEvent[] }>(
      `/me/calendars/${calendarId}/events?$filter=${filterMeetingId(meetingId)}`
    )
    return events?.[0]
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

    const requests: APIRequest[] = []

    for (const event of events) {
      if (!event.id || !event.start?.dateTime) continue
      const date = dateToTimeZone(
        dateToTimeZone(
          new Date(event.start.dateTime),
          event.start.timeZone || 'UTC',
          true
        ),
        meetingEvent.timezone
      )
        .toISOString()
        .substring(0, 19)

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
      }
    }

    // Fix occurrences and exceptions
    await this.apiBatch(requests)
  }

  // Create events from Rolebase meetings
  private async transformMeetingEvent(
    event: MeetingEvent
  ): Promise<OfficeEvent> {
    const officeEvent: OfficeEvent = {
      subject: `${event.role} - ${event.title}`,
      body: {
        contentType: 'html',
        content:
          `Notes : <a href="${event.url}">${event.url}</a>` +
          (event.videoConf
            ? `<br /><br />Visio : <a href="${event.videoConf}">${event.videoConf}</a>`
            : ''),
      },
      start: {
        dateTime: event.startDate,
        timeZone: event.timezone,
      },
      end: {
        dateTime: event.endDate,
        timeZone: event.timezone,
      },
      recurrence: transformRRuleToRecurrence(event.rrule),
      // Set meetingId and orgId in extended properties
      singleValueExtendedProperties: [
        { id: orgIdProp, value: event.orgId },
        { id: meetingIdProp, value: event.id },
      ],
    }

    // Add hash in extended properties
    officeEvent.singleValueExtendedProperties?.push({
      id: hashProp,
      value: await this.generateHash(event),
    })

    return officeEvent
  }

  // Compute hash of synchronized properties
  // Useful to skip notifications that have a correct hash
  private async generateHash(event: OfficeEvent): Promise<string> {
    return sha1(
      `${event.subject}${event.start?.dateTime}${event.end?.dateTime}`
    )
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
    if (
      this.secretConfig.subscriptions.some((s) => s.calendarId === calendarId)
    ) {
      return
    }
    if (debug) {
      console.log(
        `[App ${this.userApp.id}] Fix missing subscription for calendar ${calendarId}`
      )
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
    if (debug) {
      console.log(
        `[App ${this.userApp.id}] API ${
          init?.method || 'GET'
        } ${path} ${JSON.stringify(init)}`
      )
    }

    let tries = 0
    const maxTries = 5

    while (tries < maxTries) {
      const accessToken = await this.getAccessToken()
      const response = await fetch(`${graphApiUrl}${path}`, {
        method: 'GET',
        ...init,
        headers: {
          ...init?.headers,
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          Prefer: `outlook.timezone="${this.timezone}"`,
        },
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
