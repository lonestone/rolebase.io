import { MeetingFragment, MeetingRecurringFragment, gql } from '@gql'
import settings from '@settings'
import filterEntities from '@shared/helpers/filterEntities'
import getMeetingVideoConfUrl from '@shared/helpers/getMeetingVideoConfUrl'
import { getOrgPath } from '@shared/helpers/getOrgPath'
import { getParticipantCircles } from '@shared/helpers/getParticipantCircles'
import { dateFromTimeZone, getDateFromUTCDate } from '@shared/helpers/rrule'
import { EntityFilters } from '@shared/model/participants'
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
  timezone?: string
  rrule?: RRule
  exdates?: string[] // ISO date strings
  url: string
  videoConf?: string
}

export default class AbstractCalendarApp<
  SecretConfig,
  Config,
> extends AbstractApp<SecretConfig, Config> {
  // Get all meetings of an organization
  protected async getOrgMeetings(orgId: string): Promise<MeetingEvent[]> {
    const orgResult = await adminRequest(GET_MEETINGS, {
      orgId,
      userId: this.userApp.userId,
    })

    const org = orgResult.org_by_pk
    if (!org) return []

    const member = org.members[0]
    if (!member) return []

    // Get member's circles
    const memberCirclesIds = getParticipantCircles(member.id, org.circles)?.map(
      (c) => c.id
    )

    const meetings = filterEntities(
      EntityFilters.Invited,
      org.meetings,
      undefined,
      member.id,
      memberCirclesIds
    ) as typeof org.meetings

    // Setup calendar
    const events: MeetingEvent[] = []

    const orgUrl = `${settings.url}${getOrgPath(org)}`

    // Add events
    for (const meeting of meetings) {
      events.push(
        AbstractCalendarApp.transformMeetingToEvent(
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
      undefined,
      member.id,
      memberCirclesIds
    ) as typeof org.meetings_recurring

    // Add recurring events
    for (const recurringMeeting of recurringMeetings) {
      const exdates = meetings
        .filter(
          (meeting) =>
            meeting.recurringId === recurringMeeting.id && meeting.recurringDate
        )
        .map((meeting) => meeting.recurringDate as string)

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

  public static transformMeetingToEvent(
    meeting: MeetingFragment,
    orgUrl: string,
    roleName: string,
    memberName: string
  ): MeetingEvent {
    const url = `${orgUrl}/meetings/${meeting.id}`

    // Event description
    const videoConf = getMeetingVideoConfUrl(meeting, roleName, memberName)

    return {
      id: meeting.id,
      orgId: meeting.orgId,
      title: meeting.title,
      role: roleName,
      startDate: meeting.startDate,
      endDate: meeting.endDate,
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
    const startDate = dateFromTimeZone(getDateFromUTCDate(nextDate), timezone)
    const newRrule = new RRule({
      ...rrule.origOptions,
      dtstart: startDate,
    })
    const endDate = new Date(startDate.getTime() + meeting.duration * 60 * 1000)
    const now = new Date().toISOString()

    return {
      id: meeting.id,
      orgId: meeting.orgId,
      title: meeting.template.title,
      role: meeting.circle.role.name,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      timezone,
      rrule: newRrule,
      exdates: exdates
        .map((date) => new Date(date).toISOString())
        .filter((date) => date > now),
      url,
    }
  }
}

const GET_MEETINGS = gql(`
  query getOrgMeetingsForCalendarApp($orgId: uuid!, $userId: uuid!) {
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
        where: { archived: { _eq: false } }
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
      }
    }
  }
`)
