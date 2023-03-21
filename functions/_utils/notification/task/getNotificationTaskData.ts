import { gql } from '@gql'
import { adminRequest } from '@utils/adminRequest'
import { RouteError } from '@utils/route'

export async function getNotificationTaskData(taskId: string) {
  const { task_by_pk } = await adminRequest(GET_TASK_DATA, {
    id: taskId,
  })
  if (!task_by_pk) {
    throw new RouteError(404, 'Task not found')
  }

  return task_by_pk
}

const GET_TASK_DATA = gql(`
  query getTaskData($id: uuid!) {
    task_by_pk(id: $id) {
      ...Task
      member {
          id
          name
          user {
            id
            email
            locale
          }
        }
      org {
        ...Org
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
