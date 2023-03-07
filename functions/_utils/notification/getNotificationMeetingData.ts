import { gql } from '@gql'
import { adminRequest } from '../adminRequest'
import { RouteError } from '../route'

export async function getNotificationMeetingData(
  meetingId: string,
  userId: string
) {
  const { meeting_by_pk } = await adminRequest(GET_MEETING_DATA, {
    id: meetingId,
    userId,
  })
  if (!meeting_by_pk) {
    throw new RouteError(404, 'Meeting not found')
  }
  return meeting_by_pk
}

const GET_MEETING_DATA = gql(`
  query getMeetingData($id: uuid!, $userId:uuid!) {
    meeting_by_pk(id: $id) {
      id
      org {
        ...Org
        members(where: { userId: { _eq: $userId }}) {
          id
        }
      }
      title
      circle {
        id
        role {
          name
        }
      }
      attendees
      participantsScope
      participantsMembersIds
      recurringId
    }
  }
`)
