import filterScopedEntitiesByMember from '@rolebase/shared/helpers/filterScopedEntitiesByMember'
import getMeetingVideoConfUrl from '@rolebase/shared/helpers/getMeetingVideoConfUrl'
import { getOrgPath } from '@rolebase/shared/helpers/getOrgPath'
import {
  dateToTimeZone,
  excludeMeetingsFromRRule,
  getUTCDateFromDate,
} from '@rolebase/shared/helpers/rrule'
import { TRPCError } from '@trpc/server'
import { ICalCalendar } from 'ical-generator'
import { RRule } from 'rrule'
import * as yup from 'yup'
import { authedProcedure } from '../../authedProcedure'
import { gql } from '../../gql'
import i18n from '../../i18n'
import settings from '../../settings'
import { adminRequest } from '../../utils/adminRequest'
import { generateMeetingToken } from '../../utils/generateMeetingToken'

const yupSchema = yup.object().shape({
  orgId: yup.string().required(),
  token: yup.string().required(),
  memberId: yup.string().required(),
  lang: yup.string().required(),
})

export const meetingsIcal = authedProcedure
  .input(yupSchema)
  .query(async (opts): Promise<string> => {
    const { orgId, token, memberId, lang } = opts.input

    // Validate token
    if (token !== generateMeetingToken(orgId)) {
      throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid token' })
    }

    // Get org and circles
    const orgResult = await adminRequest(GET_MEETINGS, { orgId, memberId })
    const org = orgResult.org_by_pk

    if (!org) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Org not found' })
    }

    // Setup calendar
    const cal = new ICalCalendar()
    cal.name(`Réunions ${org.name}`)

    const orgUrl = `${settings.url}${getOrgPath(org)}`

    // Add events
    for (const meeting of org.meetings) {
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
      const videoConf = getMeetingVideoConfUrl(
        meeting,
        meeting.circle.role.name
      )
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
    const recurringMeetings = filterScopedEntitiesByMember(
      org.meetings_recurring,
      memberId,
      org.circles
    )

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
          dtstart: getUTCDateFromDate(dateToTimeZone(nextDate, timezone)),
        }),
        recurringMeeting.meetings
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

    opts.ctx.res.set('Content-Type', 'text/calendar; charset=utf-8')
    context.res.set('Content-Disposition', 'attachment; filename=meetings.ics')
    return cal.toString()
  })

const GET_MEETINGS = gql(`
  query getOrgMeetingsForIcal($orgId: uuid!, $memberId: uuid) {
    org_by_pk(id: $orgId) {
      id
      name
      slug
      circles(where: { archived: { _eq: false } }) {
        ...CircleFull
      }
      meetings(
        where: {
          archived: { _eq: false }
          meeting_attendees: { memberId: { _eq: $memberId } }
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
