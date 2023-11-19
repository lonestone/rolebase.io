import { MeetingFragment, MeetingRecurringFragment, gql } from '@gql'
import settings from '@settings'
import filterEntities from '@shared/helpers/filterEntities'
import getMeetingVideoConfUrl from '@shared/helpers/getMeetingVideoConfUrl'
import { getOrgPath } from '@shared/helpers/getOrgPath'
import { dateToTimeZone, getDateFromUTCDate } from '@shared/helpers/rrule'
import { truthy } from '@shared/helpers/truthy'
import { EntityFilters } from '@shared/model/participants'
import { AppCalendarConfig, OrgCalendarConfig } from '@shared/model/user_app'
import { adminRequest } from '@utils/adminRequest'
import { RRule } from 'rrule'
import AbstractApp from './_AbstractApp'

export interface MeetingEvent {
  id: string
  orgId: string
  title: string
  role: string
  startDate: string // ISO date string
  endDate: string // ISO date string
  timezone: string
  rrule?: RRule
  exdates?: string[] // ISO date strings
  url: string
  videoConf?: string
}

export default abstract class AbstractCalendarApp<
  SecretConfig,
> extends AbstractApp<SecretConfig, AppCalendarConfig> {
  // Abstract methods to implement
  protected abstract connectOrgCalendar(
    orgCalendar: OrgCalendarConfig
  ): Promise<void>
  protected abstract disconnectOrgCalendar(
    orgCalendar: OrgCalendarConfig
  ): Promise<void>

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

  // Get all meetings of an organization
  protected async getOrgMeetings(orgId: string): Promise<MeetingEvent[]> {
    // Search meetings with start date after 30 days ago
    const afterDate = new Date(
      Date.now() - 30 * 24 * 60 * 60 * 1000
    ).toISOString()

    const orgResult = await adminRequest(GET_MEETINGS, {
      orgId,
      userId: this.userApp.userId,
      afterDate,
    })

    const org = orgResult.org_by_pk
    if (!org) return []

    const member = org.members[0]
    if (!member) return []

    const meetings = filterEntities(
      EntityFilters.Invited,
      org.meetings,
      org.circles,
      undefined,
      member.id
    ) as typeof org.meetings

    // Setup calendar
    const events: MeetingEvent[] = []

    const orgUrl = `${settings.url}${getOrgPath(org)}`

    // Add events
    for (const meeting of meetings) {
      events.push(
        this.transformMeetingToEvent(
          meeting,
          orgUrl,
          meeting.circle.role.name,
          member.name
        )
      )
    }

    // Filter recurring meetings
    const recurringMeetings = filterEntities(
      EntityFilters.Invited,
      org.meetings_recurring,
      org.circles,
      undefined,
      member.id
    ) as typeof org.meetings_recurring

    // Add recurring events
    for (const recurringMeeting of recurringMeetings) {
      const exdates = recurringMeeting.meetings
        .map((meeting) => meeting.recurringDate)
        .filter(truthy)

      // Add event
      events.push(
        AbstractCalendarApp.transformMeetingRecurringToEvent(
          recurringMeeting,
          exdates,
          orgUrl
        )
      )
    }

    return events
  }

  // Get all meetings of an organization
  protected async getMeetingById(
    meetingId: string,
    orgId: string
  ): Promise<MeetingEvent | undefined> {
    const orgResult = await adminRequest(GET_MEETING, {
      meetingId,
      userId: this.userApp.userId,
    })

    const meeting = orgResult.meeting_by_pk
    if (!meeting || meeting.orgId !== orgId || meeting.archived) return
    const member = meeting.org.members[0]
    if (!member) return

    const orgUrl = `${settings.url}${getOrgPath(meeting.org)}`

    // Add event
    return this.transformMeetingToEvent(
      meeting,
      orgUrl,
      meeting.circle.role.name,
      member.name
    )
  }

  // Get all recurring meetings of an organization
  protected async getMeetingRecurringById(
    meetingId: string,
    orgId: string
  ): Promise<MeetingEvent | undefined> {
    const orgResult = await adminRequest(GET_MEETING_RECURRING, {
      meetingId,
      userId: this.userApp.userId,
    })

    const meeting = orgResult.meeting_recurring_by_pk
    if (!meeting || meeting.orgId !== orgId) return
    const member = meeting.org.members[0]
    if (!member) return

    const orgUrl = `${settings.url}${getOrgPath(meeting.org)}`

    // Add event
    return AbstractCalendarApp.transformMeetingRecurringToEvent(
      meeting,
      meeting.meetings.map((m) => m.recurringDate).filter(truthy),
      orgUrl
    )
  }

  // Create a meeting
  protected async createMeeting(
    meeting: Partial<MeetingFragment>
  ): Promise<void> {
    await adminRequest(CREATE_MEETING, {
      meeting: { ...meeting, lastUpdateSource: this.userApp.id },
    })
  }

  // Update a meeting
  protected async updateMeeting(
    meetingId: string,
    values: Partial<MeetingFragment>
  ): Promise<void> {
    await adminRequest(UPDATE_MEETING, {
      meetingId,
      values: { ...values, lastUpdateSource: this.userApp.id },
    })
  }

  // Delete a meeting
  protected async deleteMeeting(meetingId: string): Promise<void> {
    await adminRequest(DELETE_MEETING, {
      meetingId,
    })
  }

  public transformMeetingToEvent(
    meeting: MeetingFragment,
    orgUrl: string,
    roleName: string,
    memberName: string
  ): MeetingEvent {
    const url = `${orgUrl}/meetings/${meeting.id}`

    // Convert dates to user timezone
    const startDate = dateToTimeZone(new Date(meeting.startDate), this.timezone)
      .toISOString()
      .substring(0, 19)
    const endDate = dateToTimeZone(new Date(meeting.endDate), this.timezone)
      .toISOString()
      .substring(0, 19)

    // Event description
    const videoConf = getMeetingVideoConfUrl(meeting, roleName, memberName)

    return {
      id: meeting.id,
      orgId: meeting.orgId,
      title: meeting.title,
      role: roleName,
      startDate,
      endDate,
      timezone: this.timezone,
      url,
      videoConf,
    }
  }

  public static transformMeetingRecurringToEvent(
    meeting: MeetingRecurringFragment,
    exdates: string[],
    orgUrl: string
  ): MeetingEvent {
    const url = `${orgUrl}/meetings-recurring/${meeting.id}`

    const rrule = RRule.fromString(meeting.rrule)
    const timezone = rrule.options.tzid || 'UTC'

    // Start date is set to next occurrence date
    // to avoid showing past occurrences
    const nextDate = rrule.after(new Date(), true)
    if (!nextDate) {
      throw new Error('Could not find next date for recurring meeting')
    }
    const startDate = dateToTimeZone(getDateFromUTCDate(nextDate), timezone)
    const newRrule = new RRule({
      ...rrule.origOptions,
      dtstart: startDate,
    })
    const endDate = new Date(startDate.getTime() + meeting.duration * 60 * 1000)
    const now = new Date().toISOString().substring(0, 19)

    return {
      id: meeting.id,
      orgId: meeting.orgId,
      title: meeting.template.title,
      role: meeting.circle.role.name,
      startDate: startDate.toISOString().substring(0, 19),
      endDate: endDate.toISOString().substring(0, 19),
      timezone,
      rrule: newRrule,
      exdates: exdates
        .map((date) =>
          dateToTimeZone(new Date(date), timezone)
            .toISOString()
            .substring(0, 19)
        )
        .filter((date) => date > now),
      url,
    }
  }

  protected findMeetingIdInContent(content: string): string | undefined {
    const matchMeeting = content.match(
      new RegExp(
        `${settings.url}/(?:orgs/[a-z0-9-]+|[a-z0-9]+(?:-[a-z0-9]+)*)/meetings/([a-z0-9-]+)`
      )
    )
    if (!matchMeeting) return
    const [, meetingId] = matchMeeting
    return meetingId
  }

  protected findMeetingRecurringIdInContent(
    content: string
  ): string | undefined {
    const matchMeeting = content.match(
      new RegExp(
        `${settings.url}/(?:orgs/[a-z0-9-]+|[a-z0-9]+(?:-[a-z0-9]+)*)/meetings-recurring/([a-z0-9-]+)`
      )
    )
    if (!matchMeeting) return
    const [, meetingId] = matchMeeting
    return meetingId
  }
}

const GET_MEETINGS = gql(`
  query getOrgMeetingsForCalendarApp($orgId: uuid!, $userId: uuid!, $afterDate: timestamptz!) {
    org_by_pk(id: $orgId) {
      id
      name
      slug
      circles(where: { archived: { _eq: false } }) {
        ...CircleFull
      }
      members(where: {
        userId: { _eq: $userId }
        archived: { _eq: false }
      }) {
        id
        name
      }
      meetings(
        where: {
          startDate: { _gt: $afterDate }
          archived: { _eq: false }
        }
        order_by: { startDate: asc }
      ) {
        ...Meeting
        circle {
          role {
            name
          }
        }
      }
      meetings_recurring {
        ...MeetingRecurring
        meetings {
          recurringDate
        }
      }
    }
  }
`)

const GET_MEETING = gql(`
  query getMeetingForCalendarApp($meetingId: uuid!, $userId: uuid!) {
    meeting_by_pk(id: $meetingId) {
      ...Meeting
      circle {
        role {
          name
        }
      }
      org {
        id
        name
        slug
        members(where: {
          userId: { _eq: $userId }
          archived: { _eq: false }
        }) {
          id
          name
        }
      }
    }
  }
`)

const GET_MEETING_RECURRING = gql(`
  query getMeetingRecurringForCalendarApp($meetingId: uuid!, $userId: uuid!) {
    meeting_recurring_by_pk(id: $meetingId) {
      ...MeetingRecurring
      meetings {
        recurringDate
      }
      org {
        id
        name
        slug
        members(where: {
          userId: { _eq: $userId }
          archived: { _eq: false }
        }) {
          id
          name
        }
        meetings {
          recurringDate
        }
      }
    }
  }
`)

const CREATE_MEETING = gql(`
  mutation createMeetingForCalendarApp($meeting: meeting_insert_input!) {
    insert_meeting_one(object: $meeting) {
      id
    }
  }
`)

const UPDATE_MEETING = gql(`
  mutation updateMeetingForCalendarApp($meetingId: uuid!, $values: meeting_set_input!) {
    update_meeting_by_pk(pk_columns: { id: $meetingId }, _set: $values) {
      id
    }
  }
`)

const DELETE_MEETING = gql(`
  mutation deleteMeetingForCalendarApp($meetingId: uuid!) {
    delete_meeting_by_pk(id: $meetingId) {
      id
    }
  }
`)
