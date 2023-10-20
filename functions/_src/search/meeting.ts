import { DocumentType, gql, MeetingFragment, MeetingStepFragment } from '@gql'
import settings from '@settings'
import { getMeetingParticipants } from '@shared/helpers/getMeetingParticipants'
import { getOrgPath } from '@shared/helpers/getOrgPath'
import { SearchDoc, SearchTypes } from '@shared/model/search'
import { adminRequest } from '@utils/adminRequest'
import { HasuraEvent } from '@utils/nhost'
import { appFactory } from 'routes/apps'
import AbstractCalendarApp from 'routes/apps/_AbstractCalendarApp'
import { IndexEntity } from './IndexEntity'

const Fragment = gql(`
  fragment MeetingSearch on meeting {
    id
    orgId
    title
    circle {
      role {
        name
      }
    }
    steps {
      notes
    }
    createdAt
    startDate
  }
`)

const transform = (fragment: DocumentType<typeof Fragment>): SearchDoc => ({
  objectID: fragment.id,
  orgId: fragment.orgId,
  type: SearchTypes.Meeting,
  title: `${fragment.circle.role.name} - ${fragment.title}`,
  description: fragment.steps.map((step) => step.notes).join('\n'),
  createdAt: new Date(fragment.createdAt).getTime(),
  startDate: new Date(fragment.startDate).getTime(),
  boost: 0,
})

// Notify calendar apps of users when one of those props changes
const appNotifyProps: Array<keyof MeetingFragment> = [
  'startDate',
  'endDate',
  'title',
  'archived',
  'videoConf',
]

export class IndexMeeting extends IndexEntity<MeetingFragment> {
  static table = 'public.meeting'

  async getById(id: string) {
    const { meeting_by_pk: meeting } = await adminRequest(
      gql(`
        query GetMeetingForSearch($id: uuid!) {
          meeting_by_pk(id: $id) {
            ...MeetingSearch
          }
        }
      `),
      { id }
    )
    if (!meeting) return undefined
    return meeting && transform(meeting)
  }

  async getAll() {
    const { meeting } = await adminRequest(
      gql(`
        query GetMeetingsForSearch {
          meeting(where: { archived: { _eq: false } }) {
            ...MeetingSearch
          }
        }
      `)
    )
    return meeting.map(transform)
  }

  async applyEvent(event: HasuraEvent<MeetingFragment>) {
    super.applyEvent(event)
    return

    // Compute participants to notify calendars apps of corresponding users
    const { data } = event.event
    const meetingId = data.new?.id
    const orgId = data.new?.orgId
    if (!orgId) return

    // Skip if lastUpdateSource is true
    const lastUpdateSource = (data.new as any)?.lastUpdateSource
    if (lastUpdateSource) {
      await resetLastUpdateSource(meetingId)
    }

    const result = await adminRequest(
      gql(`
        query GetMeetingDataForSearch($meetingId: uuid!, $orgId: uuid!) {
          meeting_by_pk(id: $meetingId) {
            circle {
              role {
                name
              }
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

    const roleName = result.meeting_by_pk?.circle.role.name
    const org = result.org_by_pk
    const circles = org?.circles
    const members = org?.members
    if (!roleName || !org || !circles || !members) {
      console.error(
        `Could not find meeting data for notification: ${meetingId} -> ${JSON.stringify(
          result
        )}`
      )
      return
    }

    const prevParticipants = data.old?.archived
      ? []
      : getMeetingParticipants(data.old, circles, members)
    const nextParticipants = data.new?.archived
      ? []
      : getMeetingParticipants(data.new, circles, members)
    const orgUrl = `${settings.url}${getOrgPath(org)}`

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
      if (!member) continue
      const userApps = member.user?.apps || []
      const meeting = data.new!
      for (const userApp of userApps) {
        if (lastUpdateSource === userApp.id) continue
        const app = appFactory(userApp)
        await app.upsertMeetingEvent(
          AbstractCalendarApp.transformMeetingToEvent(
            meeting,
            orgUrl,
            roleName,
            member.name
          ),
          data.old?.startDate
        )

        // Newly created occurrence of a recurring meeting?
        // Delete event occurrence
        if (!data.old && meeting.recurringId && meeting.recurringDate) {
          await app.deleteRecurringMeetingOccurrence(
            meeting.recurringId,
            meeting.orgId,
            new Date(meeting.recurringDate).toISOString()
          )
        }
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
          if (lastUpdateSource === userApp.id) continue
          const app = appFactory(userApp)
          const meeting = data.old!
          await app.deleteMeetingEvent(
            meeting.id,
            meeting.orgId,
            new Date(meeting.startDate).toISOString()
          )
        }
        continue
      }
    }
  }
}

export class IndexMeetingStep extends IndexEntity<MeetingStepFragment> {
  static table = 'public.meeting_step'

  async applyEvent(event: HasuraEvent<MeetingStepFragment>) {
    const { data } = event.event
    const meetingId = data.new?.meetingId

    // Have notes changed?
    if (meetingId && data.new?.notes !== data.old?.notes) {
      const searchDoc = await new IndexMeeting().getById(meetingId)
      if (!searchDoc) return
      // Update meeting
      await this.index.saveObject(searchDoc).catch(console.error)
    }
  }
}
async function resetLastUpdateSource(meetingId: string | undefined) {
  await adminRequest(
    gql(`
      mutation ResetLastUpdateSource($id: uuid!) {
        update_meeting_by_pk(
          pk_columns: { id: $id }
          _set: { lastUpdateSource: null }
        ) {
          id
        }
      }
    `),
    { id: meetingId }
  )
}
