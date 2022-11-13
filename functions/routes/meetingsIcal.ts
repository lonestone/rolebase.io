import { gql } from '@gql'
import i18n from '@i18n'
import filterEntities from '@shared/helpers/filterEntities'
import { getParticipantCircles } from '@shared/helpers/getParticipantCircles'
import { CircleWithRoleEntry } from '@shared/model/circle'
import { MeetingEntry } from '@shared/model/meeting'
import { EntityFilters } from '@shared/model/types'
import { adminRequest } from '@utils/adminRequest'
import { generateMeetingToken } from '@utils/generateMeetingToken'
import { guardQueryParams } from '@utils/guardQueryParams'
import { route, RouteError } from '@utils/route'
import settings from '@utils/settings'
import { ICalCalendar } from 'ical-generator'
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
  const orgResult = await adminRequest(GET_ORG_AND_CIRCLES, { id: orgId })
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
    org.meetings as MeetingEntry[],
    circleId,
    memberId,
    memberCircles?.map((c) => c.id)
  )

  // Setup calendar
  const cal = new ICalCalendar()
  cal.name(`Réunions ${org.name}`)

  const meetingsUrl = `${settings.url}/${org.slug || `orgs/${orgId}`}/meetings`

  // Add events
  for (const meeting of meetings) {
    const circle = circleswithRoles.find((c) => c.id === meeting.circleId)
    const url = `${meetingsUrl}/${meeting.id}`

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
          role: circle?.role.name,
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

const GET_ORG_AND_CIRCLES = gql(`
  query getOrgAndCircles($id: uuid!) {
    org_by_pk(id: $id) {
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
        participantsScope
        participantsMembersIds
        initiatorMemberId
        facilitatorMemberId
        createdAt
        startDate
        endDate
        ended
        title
        attendees
        stepsConfig
        currentStepId
        archived
        videoConf
      }
    }
  }
`)
