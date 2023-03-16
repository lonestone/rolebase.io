import { getNotificationTaskData } from '@utils/notification/task/getNotificationTaskData'

export default async function taskAssignedInsertAction(
  taskId: string,
  memberAssignedId?: string | null
) {
  if (!memberAssignedId) {
    return null
  }
  // Get task data
  const task = await getNotificationTaskData(taskId, memberAssignedId)

  return task
}
