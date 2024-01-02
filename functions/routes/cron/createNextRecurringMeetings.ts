import { gql } from '@gql'
import { getScopeMemberIds } from '@shared/helpers/getScopeMemberIds'
import { getDateFromUTCDate } from '@shared/helpers/rrule'
import { adminRequest } from '@utils/adminRequest'
import { guardWebhookSecret } from '@utils/guardWebhookSecret'
import { route } from '@utils/route'
import { add } from 'date-fns'
import { RRule } from 'rrule'

const maxAheadTime = 14 * 24 * 60 * 60 * 1000 // 2 weeks

export default route(async (context): Promise<void> => {
  guardWebhookSecret(context)

  const { meeting_recurring } = await adminRequest(GET_RECURRING_MEETINGS)

  for (const { id, rrule, meetings } of meeting_recurring) {
    const nowDate = new Date()
    const nextDateUTC = RRule.fromString(rrule).after(nowDate, true)
    if (!nextDateUTC) continue
    const nextDate = getDateFromUTCDate(nextDateUTC)

    // Don't create meetings too far in the future
    if (nextDate.getTime() > nowDate.getTime() + maxAheadTime) continue

    // Check if next meeting already exists
    const nextDateStr = nextDate.toISOString().substring(0, 10)
    const meetingExists = meetings.some((meeting) => {
      const dateStr = meeting.recurringDate?.substring(0, 10)
      if (!dateStr) return false
      // Meeting exist (in the future, see query) at exact next date or before
      return dateStr <= nextDateStr
    })
    if (meetingExists) continue

    // Fetch all recurring meeting data
    const { meeting_recurring_by_pk: recurringMeeting } = await adminRequest(
      GET_RECURRING_MEETING,
      { id }
    )
    if (!recurringMeeting) continue
    const circles = recurringMeeting.org.circles

    // Create meeting
    const { insert_meeting_one } = await adminRequest(CREATE_MEETING, {
      meeting: {
        orgId: recurringMeeting.orgId,
        circleId: recurringMeeting.circleId,
        startDate: nextDate.toISOString(),
        endDate: add(nextDate, {
          minutes: recurringMeeting.duration,
        }).toISOString(),
        title: recurringMeeting.template.title,
        stepsConfig: recurringMeeting.template.stepsConfig,
        videoConf: recurringMeeting.videoConf,
        recurringDate: nextDate.toISOString(),
        recurringId: id,
        meeting_attendees: {
          data: getScopeMemberIds(recurringMeeting.scope, circles).map(
            (id) => ({ memberId: id })
          ),
        },
      },
    })

    console.log(`Next meeting created for ${id}: ${insert_meeting_one?.id}`)
  }
})

const GET_RECURRING_MEETINGS = gql(`
  query GetRecurringMeetings {
    meeting_recurring {
      id
      rrule
      meetings(where: { recurringDate: { _gt: "now()" } }) {
        recurringDate
      }
    }
  }
`)

const GET_RECURRING_MEETING = gql(`
  query GetRecurringMeeting($id: uuid!) {
    meeting_recurring_by_pk(id: $id) {
      orgId
      circleId
      scope
      template {
        title
        stepsConfig
      }
      duration
      videoConf
      org {
        circles(where: { archived: { _eq: false } }) {
          ...CircleFull
        }
      }
    }
  }
`)

const CREATE_MEETING = gql(`
  mutation CreateMeeting($meeting: meeting_insert_input!) {
    insert_meeting_one(object: $meeting) {
      id
    }
  }
`)
