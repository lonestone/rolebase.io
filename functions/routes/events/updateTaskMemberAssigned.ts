import { Member_Role_Enum, Task_Set_Input } from '@gql'
import { guardOrg } from '@utils/guardOrg'
import { guardWebhookSecret } from '@utils/guardWebhookSecret'
import { HasuraEvent } from '@utils/nhost'
import { getNotificationTaskData } from '@utils/notification/getNotificationTaskData'
import { taskAssignedSend } from '@utils/notification/taskAssignedSend'
import { route, RouteError } from '@utils/route'

export default route(async (context): Promise<void> => {
  guardWebhookSecret(context)

  const event: HasuraEvent = context.req.body

  // Sender
  const senderUserId = event.event.session_variables['x-hasura-user-id']
  if (!senderUserId) {
    throw new RouteError(401, `Unauthorized`)
  }

  // Old task
  const oldTask: Task_Set_Input = event.event.data.old
  if (!oldTask) {
    throw new RouteError(404, `Bad request`)
  }
  // Check org permission
  await guardOrg(
    { userId: senderUserId },
    oldTask.orgId!,
    Member_Role_Enum.Member
  )

  // New task
  const newTask: Task_Set_Input = event.event.data.new
  if (!newTask) {
    throw new RouteError(404, `Bad request`)
  }
  // Check org permission
  await guardOrg(
    { userId: senderUserId },
    newTask.orgId!,
    Member_Role_Enum.Member
  )

  if (newTask.id && newTask.memberId && newTask.memberId !== oldTask.memberId) {
    // Get task data
    const task = await getNotificationTaskData(newTask.id, newTask.memberId)
    await taskAssignedSend(senderUserId, task)
  }
})
