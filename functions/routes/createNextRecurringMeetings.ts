import { gql } from '@gql'
import { adminRequest } from '@utils/adminRequest'
import { guardWebhookSecret } from '@utils/guardWebhookSecret'
import { route } from '@utils/route'
import { add } from 'date-fns'
import { RRule } from 'rrule'

export default route(async (context): Promise<void> => {
  guardWebhookSecret(context)

  const { meeting_recurring } = await adminRequest(GET_RECURRING_MEETINGS)

  for (const recurringMeeting of meeting_recurring) {
    const nowDate = new Date()
    const rrule = RRule.fromString(recurringMeeting.rrule)
    const nextDate = rrule.after(nowDate, true)
    const nextDateStr = nextDate.toISOString().substring(0, 10)

    // Check if next meeting already exists
    const meetingExists = recurringMeeting.meetings.some(
      (meeting) => meeting.recurringDate?.substring(0, 10) === nextDateStr
    )
    if (meetingExists) continue

    // Create meeting
    await adminRequest(CREATE_MEETING, {
      meeting: {
        orgId: recurringMeeting.orgId,
        circleId: recurringMeeting.circleId,
        participantsScope: recurringMeeting.participantsScope,
        participantsMembersIds: recurringMeeting.participantsMembersIds,
        startDate: nextDate.toISOString(),
        endDate: add(nextDate, {
          minutes: recurringMeeting.duration,
        }).toISOString(),
        title: recurringMeeting.template.title,
        stepsConfig: recurringMeeting.template.stepsConfig,
        videoConf: recurringMeeting.videoConf,
        recurringDate: nextDate.toISOString(),
        recurringId: recurringMeeting.id,
      },
    })

    // TODO: Send notification to participants

    console.log(
      `Next meeting created for ${
        recurringMeeting.id
      }: [${nextDate.toISOString()}] ${recurringMeeting.circle.role.name} - ${
        recurringMeeting.template.title
      }`
    )
  }
})

const GET_RECURRING_MEETINGS = gql(`
  query GetRecurringMeetings {
    meeting_recurring {
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
      templateId
      template {
        title
        stepsConfig
      }
      rrule
      duration
      videoConf
      meetings {
        recurringDate
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
