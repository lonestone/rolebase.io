import { Member_Role_Enum, TaskFragment } from '@gql'
import { guardOrg } from '@utils/guardOrg'
import { getNotificationTaskData } from '@utils/notification/task/getNotificationTaskData'
import { RouteError } from '@utils/route'

export default async function taskAssignedUpdateAction(
  senderUserId: string,
  newTask: TaskFragment,
  oldTask?: TaskFragment | null
) {
  // 'memberId' should be provided in event
  if (!newTask.memberId) {
    throw new RouteError(404, `No memberId provided for new task`)
  }

  // There should be an old task in an udpate event
  if (!oldTask) {
    throw new RouteError(404, `Bad request`)
  }

  // Check permission for old task org
  await guardOrg(
    { userId: senderUserId },
    oldTask.orgId!,
    Member_Role_Enum.Member
  )

  return newTask.memberId !== oldTask.memberId
    ? await getNotificationTaskData(newTask.id, newTask.memberId)
    : null
}
