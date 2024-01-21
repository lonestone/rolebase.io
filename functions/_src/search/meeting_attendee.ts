import sendMeetingEmail from '@emails/sendMeetingEmail'
import { gql, MeetingAttendeeFragment } from '@gql'
import settings from '@settings'
import { getOrgPath } from '@shared/helpers/getOrgPath'
import { adminRequest } from '@utils/adminRequest'
import { HasuraEvent } from '@utils/nhost'
import { captureError } from '@utils/sentry'
import { appFactory } from 'routes/apps'
import { IndexEntity } from './IndexEntity'

export class IndexMeetingAttendee extends IndexEntity<MeetingAttendeeFragment> {
  static table = 'public.meeting_attendee'

  async getAll() {
    return []
  }

  async applyEvent(event: HasuraEvent<MeetingAttendeeFragment>) {
    // Compute participants to notify calendars apps of corresponding users
    const { data } = event.event
    const meetingId = data.new?.meetingId || data.old?.meetingId
    const memberId = data.new?.memberId || data.old?.memberId
    if (!meetingId || !memberId) return

    const result = await adminRequest(
      gql(`
        query GetMeetingAttendeeForSearch($meetingId: uuid!, $memberId: uuid!) {
          meeting_by_pk(id: $meetingId) {
            ...Meeting
            org {
              id
              slug
            }
            circle {
              role {
                name
              }
            }
          }
          member_by_pk(id: $memberId) {
            id
            name
            archived
            user {
              email
              locale
              metadata
              apps {
                ...UserAppFull
              }
            }
          }
        }
    `),
      { meetingId, memberId }
    )

    const meeting = result.meeting_by_pk
    const roleName = result.meeting_by_pk?.circle.role.name
    const org = result.meeting_by_pk?.org
    const member = result.member_by_pk
    if (!meeting || !roleName || !org || !member) {
      console.error(
        `Could not find meeting data for notification: ${meetingId} -> ${JSON.stringify(
          result
        )}`
      )
      return
    }

    // Send start notification to new attendee if meeting is started
    try {
      if (
        event.event.op === 'INSERT' &&
        // Attendee is present and have not been notified
        data.new?.startNotified === false &&
        data.new?.present !== false &&
        // Member has email
        member.user?.email &&
        // Meeting is started
        meeting.currentStepId !== null &&
        meeting.ended === false
      ) {
        // Send email
        await sendMeetingEmail(
          {
            lang: member.user.locale,
            timezone:
              member.user?.metadata.timezone || settings.defaultTimezone,
            title: meeting.title,
            role: meeting.circle.role.name,
            startDate: meeting.startDate,
            endDate: meeting.endDate,
            ctaUrl: `${settings.url}${getOrgPath(org)}/meetings/${meetingId}`,
          },
          [{ Name: member.name, Email: member.user?.email || '' }]
        )

        // Update attendees startNotified
        await adminRequest(UPDATE_ATTENDEE_START_NOTIFIED, {
          id: data.new?.id,
        })
      }
    } catch (error) {
      console.log(error)
      captureError(error)
    }

    // Update calendars apps
    const orgUrl = `${settings.url}${getOrgPath(org)}`
    const userApps = member.user?.apps || []

    for (const userApp of userApps) {
      try {
        const app = appFactory(userApp)
        if (data.new && !meeting.archived) {
          // Create/Update event
          await app.upsertMeetingEvent(
            app.transformMeetingToEvent(meeting, orgUrl, roleName, member.name)
          )
        } else {
          // Delete event
          await app.deleteMeetingEvent(meeting.id, meeting.orgId)
        }
      } catch (error) {
        console.log(error)
        captureError(error)
      }
    }
  }
}

const UPDATE_ATTENDEE_START_NOTIFIED = gql(`
  mutation updateAttendeeStartNotified($id: uuid!) {
    update_meeting_attendee_by_pk(
      pk_columns: { id: $id }
      _set: { startNotified: true }
    ) {
      id
    }
  }`)
