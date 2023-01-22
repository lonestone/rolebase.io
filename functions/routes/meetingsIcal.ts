import { gql } from '@gql'
import i18n from '@i18n'
import filterEntities from '@shared/helpers/filterEntities'
import { getParticipantCircles } from '@shared/helpers/getParticipantCircles'
import { CircleWithRoleEntry } from '@shared/model/circle'
import { EntityFilters } from '@shared/model/participants'
import { adminRequest } from '@utils/adminRequest'
import { generateMeetingToken } from '@utils/generateMeetingToken'
import { guardQueryParams } from '@utils/guardQueryParams'
import { route, RouteError } from '@utils/route'
import settings from '@utils/settings'
import { ICalCalendar } from 'ical-generator'
import { RRule, RRuleSet } from 'rrule'
import * as yup from 'yup'

const yupSchema = yup.object().shape({
  orgId: yup.string().required(),
  token: yup.string().required(),
  memberId: yup.string(),
  circleId: yup.string(),
  lang: yup.string().required(),
})

export default route(async (context) => {
  const { orgId, token, memberId, circleId, lang } = guardQueryParams(
    context,
    yupSchema
  )

  // Validate token
  if (token !== generateMeetingToken(orgId)) {
    throw new RouteError(401, 'Invalid token')
  }

  // Get org and circles
  const orgResult = await adminRequest(GET_MEETINGS, { orgId })
  const org = orgResult.org_by_pk

  if (!org) {
    throw new RouteError(404, 'Org not found')
  }

  const circleswithRoles = org.circles as CircleWithRoleEntry[]

  // Get member's circles
  let memberCircles: CircleWithRoleEntry[] | undefined
  if (memberId) {
    memberCircles = getParticipantCircles(memberId, circleswithRoles)
  }

  // Filter meetings
  const filter = inferFilter(memberId, circleId)

  const meetings = filterEntities(
    filter,
    org.meetings,
    circleId,
    memberId,
    memberCircles?.map((c) => c.id)
  ) as typeof org.meetings

  // Setup calendar
  const cal = new ICalCalendar()
  cal.name(`Réunions ${org.name}`)

  const orgUrl = `${settings.url}/${org.slug || `orgs/${orgId}`}`

  // Add events
  for (const meeting of meetings) {
    const url = `${orgUrl}/meetings/${meeting.id}`

    cal.createEvent({
      start: new Date(meeting.startDate),
      end: new Date(meeting.endDate),
      summary: i18n.t('meetingsIcal.meetingTitle', {
        lng: lang,
        interpolation: {
          escapeValue: false,
        },
        replace: {
          title: meeting.title,
          role: meeting.circle.role.name,
        },
      }),
      description: url,
    })
  }

  // Filter recurring meetings
  const recurringMeetings = filterEntities(
    filter,
    org.meetings_recurring,
    circleId,
    memberId,
    memberCircles?.map((c) => c.id)
  ) as typeof org.meetings_recurring

  // Add recurring events
  for (const recurringMeeting of recurringMeetings) {
    const url = `${orgUrl}/meetings-recurring/${recurringMeeting.id}`

    // Parse RRule and exclude past events by redefining start date
    const rrule = RRule.fromString(recurringMeeting.rrule)
    const start = rrule.after(new Date(), true)
    const end = new Date(
      start.getTime() + recurringMeeting.duration * 60 * 1000
    )
    const rruleFuture = new RRuleSet()
    rruleFuture.rrule(
      new RRule({
        ...rrule.origOptions,
        dtstart: start,
      })
    )

    // Exclude dates of meetings from the serie
    for (const meeting of meetings) {
      if (
        meeting.recurringId === recurringMeeting.id &&
        meeting.recurringDate
      ) {
        rruleFuture.exdate(new Date(meeting.recurringDate))
      }
    }

    cal.createEvent({
      start,
      end,
      repeating: rruleFuture.toString(),
      summary: i18n.t('meetingsIcal.meetingTitle', {
        lng: lang,
        interpolation: {
          escapeValue: false,
        },
        replace: {
          title: recurringMeeting.template.title,
          role: recurringMeeting.circle.role.name,
        },
      }),
      description: url,
    })
  }

  context.res.set('Content-Type', 'text/calendar; charset=utf-8')
  context.res.set('Content-Disposition', 'attachment; filename=meetings.ics')
  return cal.toString()
})

function inferFilter(memberId?: string, circleId?: string) {
  if (memberId) return EntityFilters.Invited
  if (circleId) return EntityFilters.Circle
  return EntityFilters.All
}

const GET_MEETINGS = gql(`
  query getOrgAndCircles($orgId: uuid!) {
    org_by_pk(id: $orgId) {
      name
      slug
      circles(where: { archived: { _eq: false } }) {
        id
        roleId
        parentId
        members(where: { archived: { _eq: false } }) {
          id
          memberId
        }
        role {
          name
          singleMember
          link
        }
      }
      meetings(
        where: { archived: { _eq: false } }
        order_by: { startDate: asc }
      ) {
        id
        orgId
        circleId
        circle {
          role {
            name
          }
        }
        participantsScope
        participantsMembersIds
        attendees
        startDate
        endDate
        title
        recurringId
        recurringDate
      }
      meetings_recurring {
        id
        orgId
        circleId
        circle {
          role {
            name
          }
        }
        participantsScope
        participantsMembersIds
        template {
          title
        }
        rrule
        duration
      }
    }
  }
`)
