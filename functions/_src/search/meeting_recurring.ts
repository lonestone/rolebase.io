import { gql, MeetingRecurringFragment } from '@gql'
import settings from '@settings'
import { getOrgPath } from '@shared/helpers/getOrgPath'
import { getParticipantsByScope } from '@shared/helpers/getParticipantsByScope'
import { truthy } from '@shared/helpers/truthy'
import { adminRequest } from '@utils/adminRequest'
import { HasuraEvent } from '@utils/nhost'
import { appFactory } from 'routes/apps'
import AbstractCalendarApp from 'routes/apps/_AbstractCalendarApp'
import { RRule } from 'rrule'
import { IndexEntity } from './IndexEntity'

// Notify calendar apps of users when one of those props changes
const appNotifyProps: Array<keyof MeetingRecurringFragment> = [
  'templateId',
  'rrule',
  'duration',
]

export class IndexMeetingRecurring extends IndexEntity<MeetingRecurringFragment> {
  static table = 'public.meeting_recurring'

  async applyEvent(event: HasuraEvent<MeetingRecurringFragment>) {
    // Compute participants to notify calendars apps of corresponding users
    const { data } = event.event
    const meetingId = data.new?.id || data.old?.id
    const orgId = data.new?.orgId || data.old?.orgId
    if (!orgId) return

    const result = await adminRequest(
      gql(`
        query GetMeetingRecurringDataForSearch($meetingId: uuid!, $orgId: uuid!) {
          meeting_recurring_by_pk(id: $meetingId) {
            ...MeetingRecurring
            meetings {
              id
              recurringDate
            }
          }
          org_by_pk(id: $orgId) {
            id
            slug
            circles(where: { archived: { _eq: false } }) {
              ...CircleFull
            }
            members(where: { archived: { _eq: false } }) {
              ...Member
              user {
                apps {
                  ...UserAppFull
                }
              }
            }
          }
        }
      `),
      { meetingId, orgId }
    )

    const meetingRecurring = result.meeting_recurring_by_pk
    const exdates =
      meetingRecurring?.meetings.map((m) => m.recurringDate).filter(truthy) ||
      []
    const org = result.org_by_pk
    const circles = org?.circles
    const members = org?.members
    if (!org || !circles || !members) {
      console.error(
        `Could not find meeting_recurring data for notification: ${meetingId} -> ${JSON.stringify(
          result
        )}`
      )
      return
    }

    const prevParticipants = data.old
      ? getParticipantsByScope(
          members,
          data.old.circleId,
          circles,
          data.old.participantsScope,
          data.old.participantsMembersIds
        )
      : []
    const nextParticipants = data.new
      ? getParticipantsByScope(
          members,
          data.new.circleId,
          circles,
          data.new.participantsScope,
          data.new.participantsMembersIds
        )
      : []

    const orgUrl = `${settings.url}${getOrgPath(org)}`
    const exRrule = RRule.fromString(data.old?.rrule || data.new?.rrule || '')
    const exStartDate = exRrule.options.dtstart

    for (const nextParticipant of nextParticipants) {
      const prevParticipant = prevParticipants.find(
        (prev) => prev.member.id === nextParticipant.member.id
      )
      // Don't upsert if nothing has changed
      if (prevParticipant) {
        const hasChanged = appNotifyProps.some(
          (prop) => data.new?.[prop] !== data.old?.[prop]
        )
        if (!hasChanged) continue
      }

      // Create/Update event
      const member = members.find((m) => m.id === nextParticipant.member.id)
      if (!member || !meetingRecurring) continue
      const userApps = member.user?.apps || []
      for (const userApp of userApps) {
        const app = appFactory(userApp)
        await app.upsertMeeting(
          AbstractCalendarApp.transformMeetingRecurringToEvent(
            meetingRecurring,
            exdates,
            orgUrl
          ),
          exStartDate.toISOString()
        )
      }
    }
    for (const prevParticipant of prevParticipants) {
      const nextParticipant = nextParticipants.find(
        (next) => next.member.id === prevParticipant.member.id
      )
      if (!nextParticipant) {
        // Delete event
        const member = members.find((m) => m.id === prevParticipant.member.id)
        if (!member) continue
        const userApps = member.user?.apps || []
        for (const userApp of userApps) {
          const app = appFactory(userApp)
          const meeting = data.old!
          await app.deleteMeeting(
            meeting.id,
            meeting.orgId,
            exStartDate.toISOString(),
            true
          )
        }
        continue
      }
    }
  }
}
