import { gql, MeetingNotificationDataFragment } from '@gql'
import { adminRequest } from '../adminRequest'
import { RouteError } from '../route'

export async function getNotificationMeetingData(
  meetingId: string,
  userId: string
): Promise<MeetingNotificationDataFragment> {
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
      ...MeetingNotificationData
    }
  }
`)
