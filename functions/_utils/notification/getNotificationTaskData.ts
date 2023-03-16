import { gql, TaskNotificationDataFragment } from '@gql'
import { adminRequest } from '@utils/adminRequest'
import { RouteError } from '@utils/route'

export async function getNotificationTaskData(
  taskId: string,
  memberId: string
): Promise<TaskNotificationDataFragment> {
  const { task_by_pk } = await adminRequest(GET_TASK_DATA, {
    id: taskId,
    memberId,
  })
  if (!task_by_pk) {
    throw new RouteError(404, 'Task not found')
  }

  return task_by_pk
}

const GET_TASK_DATA = gql(`
  query getTaskData($id: uuid!, $memberId: uuid!) {
    task_by_pk(id: $id) {
      ...TaskNotificationData
    }
  }
`)
