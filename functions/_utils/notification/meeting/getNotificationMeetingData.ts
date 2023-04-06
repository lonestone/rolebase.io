import { GetMeetingDataQuery, gql } from '@gql'
import { adminRequest } from '@utils/adminRequest'
import { RouteError } from '@utils/route'

export type NotificationMeetingData = NonNullable<
  GetMeetingDataQuery['meeting_by_pk']
>

export async function getNotificationMeetingData(
  meetingId: string,
  userId: string
): Promise<NotificationMeetingData> {
  if (!meetingId || !userId) {
    throw new RouteError(404, 'Bad request')
  }

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
      orgId
      circleId
      org {
        ...Org
        members(where: { userId: { _eq: $userId } }) {
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
