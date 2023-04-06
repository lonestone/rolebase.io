import { GetThreadActivityDataQuery, gql } from '@gql'
import { adminRequest } from '@utils/adminRequest'
import { RouteError } from '@utils/route'

export type NotificationThreadActivityData = NonNullable<
  GetThreadActivityDataQuery['thread_activity_by_pk']
>

export async function getNotificationThreadActivityData(
  threadActivityId: string
): Promise<NotificationThreadActivityData> {
  const { thread_activity_by_pk } = await adminRequest(
    GET_THREAD_ACTIVITY_DATA,
    {
      id: threadActivityId,
    }
  )
  if (!thread_activity_by_pk) {
    throw new RouteError(404, 'Thread activity not found')
  }

  return thread_activity_by_pk
}

const GET_THREAD_ACTIVITY_DATA = gql(`
  query getThreadActivityData($id: uuid!) {
    thread_activity_by_pk(id: $id) {
      ...ThreadActivity
      thread {
        id
        orgId
        circleId
        participantsScope
        participantsMembersIds
        title
      }
    }
  }
`)
