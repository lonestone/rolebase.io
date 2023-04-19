import { GetThreadDataQuery, gql } from '@gql'
import { adminRequest } from '@utils/adminRequest'
import { RouteError } from '@utils/route'

export type NotificationThreadData = NonNullable<
  GetThreadDataQuery['thread_by_pk']
>

export async function getNotificationThreadData(
  threadId: string,
  userId: string
): Promise<NotificationThreadData> {
  const { thread_by_pk } = await adminRequest(GET_THREAD_DATA, {
    id: threadId,
    userId,
  })
  if (!thread_by_pk) {
    throw new RouteError(404, 'Thread not found')
  }

  return thread_by_pk
}

const GET_THREAD_DATA = gql(`
  query getThreadData($id: uuid!, $userId:uuid!) {
    thread_by_pk(id: $id) {
      ...Thread
      org {
        ...Org
        members(where: { userId: { _eq: $userId } }) {
          id
        }
      }
      circle {
        id
        role {
          name
        }
      }
    }
  }
`)
