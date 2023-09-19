import { CircleFullFragment, gql } from '@gql'
import i18n from '@i18n'
import settings from '@settings'
import filterEntities from '@shared/helpers/filterEntities'
import getMeetingVideoConfUrl from '@shared/helpers/getMeetingVideoConfUrl'
import { getParticipantCircles } from '@shared/helpers/getParticipantCircles'
import {
  dateFromTimeZone,
  excludeMeetingsFromRRule,
  getUTCDateFromDate,
} from '@shared/helpers/rrule'
import { EntityFilters } from '@shared/model/participants'
import { adminRequest } from '@utils/adminRequest'
import { generateMeetingToken } from '@utils/generateMeetingToken'
import { guardQueryParams } from '@utils/guardQueryParams'
import { RouteError, route } from '@utils/route'
import { ICalCalendar } from 'ical-generator'
import { RRule } from 'rrule'
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

  // Get member's circles
  let memberCircles: CircleFullFragment[] | undefined
  if (memberId) {
    memberCircles = getParticipantCircles(memberId, org.circles)
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

    // Event title
    const summary = i18n.t('meetingsIcal.title', {
      lng: lang,
      replace: {
        title: meeting.title,
        role: meeting.circle.role.name,
      },
    })

    // Event description
    const videoConf = getMeetingVideoConfUrl(meeting, meeting.circle.role.name)
    const description = i18n.t(
      videoConf
        ? 'meetingsIcal.description_videoConf'
        : 'meetingsIcal.description',
      {
        lng: lang,
        replace: {
          url,
          videoConf,
        },
      }
    )

    // Add event
    cal.createEvent({
      id: meeting.id,
      start: new Date(meeting.startDate),
      end: new Date(meeting.endDate),
      summary,
      description,
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

    const rruleOrig = RRule.fromString(recurringMeeting.rrule)
    const nextDate = rruleOrig.after(new Date())
    const timezone = rruleOrig.options.tzid
    if (!nextDate || !timezone) continue

    // Exclude dates of meetings from the serie
    const rrule = excludeMeetingsFromRRule(
      new RRule({
        ...rruleOrig.origOptions,
        // Change start date to next occurrence
        dtstart: getUTCDateFromDate(dateFromTimeZone(nextDate, timezone)),
      }),
      meetings.filter((m) => m.recurringId === recurringMeeting.id)
    )

    // Separate DTSTART from RRULE
    const rruleOptions = rrule._rrule[0].options
    const repeating = rrule.toString().replace(/DTSTART.*\s+/, '')
    const start = rruleOptions.dtstart
    const end = new Date(
      start.getTime() + recurringMeeting.duration * 60 * 1000
    )

    // Event title
    const summary = i18n.t('meetingsIcal.title', {
      lng: lang,
      replace: {
        title: recurringMeeting.template.title,
        role: recurringMeeting.circle.role.name,
      },
    })

    // Add event
    cal.createEvent({
      id: recurringMeeting.id,
      timezone: rruleOptions.tzid,
      start,
      end,
      repeating,
      summary,
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
        ...CircleFull
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
