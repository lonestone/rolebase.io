import { gql, MeetingRecurringNotificationDataFragment } from '@gql'
import { adminRequest } from '../adminRequest'
import { RouteError } from '../route'

export async function getNotificationMeetingRecurringData(
  meetingId: string,
  userId: string
): Promise<MeetingRecurringNotificationDataFragment> {
  if (!meetingId || !userId) {
    throw new RouteError(404, 'Bad request')
  }

  const { meeting_recurring_by_pk } = await adminRequest(
    GET_MEETING_RECURRING_DATA,
    {
      id: meetingId,
      userId,
    }
  )
  if (!meeting_recurring_by_pk) {
    throw new RouteError(404, 'Meeting recurring not found')
  }
  return meeting_recurring_by_pk
}

const GET_MEETING_RECURRING_DATA = gql(`
  query getMeetingRecurringData($id: uuid!, $userId:uuid!) {
    meeting_recurring_by_pk(id: $id) {
      ...MeetingRecurringNotificationData
    }
  }
`)
