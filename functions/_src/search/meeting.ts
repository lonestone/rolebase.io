import { DocumentType, gql, MeetingFragment } from '@gql'
import settings from '@settings'
import { getOrgPath } from '@shared/helpers/getOrgPath'
import { SearchDoc, SearchTypes } from '@shared/model/search'
import { adminRequest } from '@utils/adminRequest'
import { HasuraEvent } from '@utils/nhost'
import { captureError } from '@utils/sentry'
import { appFactory } from 'routes/apps'
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
    try {
      super.applyEvent(event)
    } catch (error) {
      console.log(error)
      captureError(error)
    }

    // Compute participants to notify calendars apps of corresponding users
    const { data } = event.event
    const meeting = data.new
    if (!meeting) return

    // Skip if there is a lastUpdateSource
    const lastUpdateSource = (data.new as any)?.lastUpdateSource
    if (lastUpdateSource) {
      await resetLastUpdateSource(meeting.id)
    }

    // Don't notify if nothing has changed
    const hasChanged = appNotifyProps.some(
      (prop) => data.new?.[prop] !== data.old?.[prop]
    )
    if (!hasChanged) return

    const result = await adminRequest(
      gql(`
        query GetMeetingDataForSearch($meetingId: uuid!) {
          meeting_by_pk(id: $meetingId) {
            org {
              id
              slug
            }
            circle {
              role {
                name
              }
            }
            meeting_attendees {
              member {
                id
                name
                archived
                user {
                  apps {
                    ...UserAppFull
                  }
                }
              }
            }
          }
        }
      `),
      { meetingId: meeting.id }
    )

    const roleName = result.meeting_by_pk?.circle.role.name
    const attendees = result.meeting_by_pk?.meeting_attendees
    const org = result.meeting_by_pk?.org
    if (!roleName || !attendees || !org) {
      console.error(
        `Could not find meeting data for notification: ${
          meeting.id
        } -> ${JSON.stringify(result)}`
      )
      return
    }

    const orgUrl = `${settings.url}${getOrgPath(org)}`

    for (const { member } of attendees) {
      if (member.archived) continue

      const userApps = member.user?.apps || []
      for (const userApp of userApps) {
        // Skip if last modif comes from this app
        if (lastUpdateSource === userApp.id) continue

        try {
          const app = appFactory(userApp)

          if (data.old) {
            if (meeting.archived) {
              // Delete event if meeting is archived
              await app.deleteMeetingEvent(meeting.id, meeting.orgId)
            } else {
              // Update event
              // Note: we don't update at creation
              // because the trigger for meeting_attendee is handling that
              await app.upsertMeetingEvent(
                app.transformMeetingToEvent(
                  meeting,
                  orgUrl,
                  roleName,
                  member.name
                )
              )
            }
          } else if (meeting.recurringId && meeting.recurringDate) {
            // Newly created occurrence of a recurring meeting
            // Delete event occurrence for attendees inserted at creation
            await app.deleteRecurringMeetingOccurrence(
              meeting.recurringId,
              meeting.orgId,
              new Date(meeting.recurringDate)
            )
          }
        } catch (error) {
          console.log(error)
          captureError(error)
        }
      }
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
