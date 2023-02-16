import { DocumentType, gql, MeetingFragment, MeetingStepFragment } from '@gql'
import { SearchDoc, SearchTypes } from '@shared/model/search'
import { adminRequest } from '@utils/adminRequest'
import { HasuraEvent } from '@utils/nhost'
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
  }
`)

const transform = (fragment: DocumentType<typeof Fragment>): SearchDoc => ({
  objectID: fragment.id,
  orgId: fragment.orgId,
  type: SearchTypes.Meeting,
  title: `${fragment.circle.role.name} - ${fragment.title}`,
  description: fragment.steps.map((step) => step.notes).join('\n'),
  createdAt: fragment.createdAt,
  boost: 0,
})

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
