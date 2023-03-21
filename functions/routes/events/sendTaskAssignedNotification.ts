import { GetTaskDataQuery, Member_Role_Enum, TaskFragment } from '@gql'
import { defaultLang, resources } from '@i18n'
import { guardOrg } from '@utils/guardOrg'
import { guardWebhookSecret } from '@utils/guardWebhookSecret'
import { HasuraEvent, HasuraEventOp } from '@utils/nhost'
import { getNotificationTaskData } from '@utils/notification/task/getNotificationTaskData'
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
  await guardOrg(
    { userId: senderUserId },
    event.event.data.new.orgId,
    Member_Role_Enum.Member
  )

  // What needs to be done in each event case
  let taskAssignedActionReturn: NonNullable<
    GetTaskDataQuery['task_by_pk']
  > | null = null
  switch (event.event.op) {
    case HasuraEventOp.INSERT:
      taskAssignedActionReturn =
        (await getNotificationTaskData(event.event.data.new.id)) ?? null
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
    // Don't send notification if no assignee
    !taskAssignedActionReturn.member?.user?.id ||
    // Don't send notification if creator is the same person as assignee
    senderUserId === taskAssignedActionReturn.member?.user?.id
  ) {
    return
  }

  const { member, org, orgId, id, title, circle } = taskAssignedActionReturn

  const recipientLocale =
    (member?.user?.locale as keyof typeof resources) || defaultLang

  const recipient = {
    subscriberId: member?.user?.id!,
    locale: recipientLocale,
  }

  // Build TaskAssignedNotification instance for each recipient
  const notification = new TaskAssignedNotification(recipientLocale, {
    org,
    orgId,
    taskId: id,
    title,
    role: circle.role.name || '',
  })
  // Send notification "taskassigned"
  await notification.send([recipient])
})
