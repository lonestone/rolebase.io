import { GetThreadActivityDataQuery, gql } from '@gql'
import { adminRequest } from '@utils/adminRequest'
import { RouteError } from '@utils/route'

export type NotificationThreadActivityData = NonNullable<
  GetThreadActivityDataQuery['thread_activity_by_pk']
>

export async function getNotificationThreadActivityData(
  threadActivityId: string,
  userId: string
): Promise<NotificationThreadActivityData> {
  if (!threadActivityId || !userId) {
    throw new RouteError(404, 'Bad request')
  }

  const { thread_activity_by_pk } = await adminRequest(
    GET_THREAD_ACTIVITY_DATA,
    {
      id: threadActivityId,
      userId,
    }
  )
  if (!thread_activity_by_pk) {
    throw new RouteError(404, 'Thread activity not found')
  }

  return thread_activity_by_pk
}

const GET_THREAD_ACTIVITY_DATA = gql(`
  query getThreadActivityData($id: uuid!, $userId:uuid!) {
    thread_activity_by_pk(id: $id) {
      ...ThreadActivity
      thread {
        id
        orgId
        circleId
        participantsScope
        participantsMembersIds
        title
        org {
          ...Org
          members(where: { userId: { _eq: $userId } }) {
            id
          }
        }
      }
    }
  }
`)
