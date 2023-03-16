import { Member_Role_Enum, TaskFragment } from '@gql'
import { defaultLang, resources } from '@i18n'
import { TaskAssignedActionReturn } from '@shared/model/notification'
import { guardOrg } from '@utils/guardOrg'
import { guardWebhookSecret } from '@utils/guardWebhookSecret'
import { HasuraEvent, HasuraEventOp } from '@utils/nhost'
import taskAssignedInsertAction from '@utils/notification/task/taskAssignedInsertAction'
import { TaskAssignedNotification } from '@utils/notification/task/taskAssignedNotification'
import taskAssignedUpdateAction from '@utils/notification/task/taskAssignedUpdateAction'
import { route, RouteError } from '@utils/route'

export default route(async (context): Promise<void> => {
  guardWebhookSecret(context)

  const event: HasuraEvent<TaskFragment> = context.req.body

  // Sender
  const senderUserId = event.event.session_variables['x-hasura-user-id']
  if (!senderUserId) {
    throw new RouteError(401, `Unauthorized`)
  }

  // Check if new task (should always be provided in event)
  if (!event.event.data.new) {
    throw new RouteError(404, 'No new task')
  }

  // Check permission for new meeting org
  const orgId = event.event.data.new.orgId
  await guardOrg({ userId: senderUserId }, orgId, Member_Role_Enum.Member)

  // What needs to be done in each event case
  let taskAssignedActionReturn: TaskAssignedActionReturn = null
  switch (event.event.op) {
    case HasuraEventOp.INSERT:
      taskAssignedActionReturn = await taskAssignedInsertAction(
        event.event.data.new.id,
        event.event.data.new.memberId
      )
      break

    case HasuraEventOp.UPDATE:
      taskAssignedActionReturn = await taskAssignedUpdateAction(
        senderUserId,
        event.event.data.new,
        event.event.data.old
      )
      break

    default:
      break
  }

  if (
    // Don't send notification if no task
    !taskAssignedActionReturn ||
    // Don't send notification if creator is the same person as assignee
    senderUserId === taskAssignedActionReturn.org.members[0].user?.id ||
    // Don't send notification if no assignee data
    !taskAssignedActionReturn.org.members[0].user?.id
  ) {
    return
  }

  const recipientLocale =
    (taskAssignedActionReturn.org.members[0].user
      ?.locale as keyof typeof resources) || defaultLang

  const recipient = {
    subscriberId: taskAssignedActionReturn.org.members[0].user?.id!,
    locale: recipientLocale,
  }

  // Build TaskAssignedNotification instance for each recipient
  const notification = new TaskAssignedNotification(recipientLocale, {
    org: taskAssignedActionReturn.org,
    orgId: taskAssignedActionReturn.orgId,
    taskId: taskAssignedActionReturn.id,
    title: taskAssignedActionReturn?.title || '',
    role: taskAssignedActionReturn?.circle.role.name || '',
  })
  // Send notification "taskassigned"
  await notification.send([recipient])
})
