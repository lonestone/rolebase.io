import { TaskFragment } from '@gql'
import { defaultLang, resources } from '@i18n'
import { guardWebhookSecret } from '@utils/guardWebhookSecret'
import { HasuraEvent } from '@utils/nhost'
import { getNotificationTaskData } from '@utils/notification/task/getNotificationTaskData'
import { TaskAssignedNotification } from '@utils/notification/task/taskAssignedNotification'
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

  // Check if task has a new assignee
  const oldTask = event.event.data.old
  const newTask = event.event.data.new
  if (!newTask.memberId || newTask.memberId === oldTask?.memberId) {
    return
  }

  // What needs to be done in each event case
  const notifData = await getNotificationTaskData(newTask.id)

  if (
    // Don't send notification if no assignee
    !notifData.member?.user?.id ||
    // Don't send notification if creator is the same person as assignee
    senderUserId === notifData.member?.user?.id
  ) {
    return
  }

  const { member, org, orgId, id, title, circle } = notifData

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
    role: circle.role.name,
  })
  // Send notification "taskassigned"
  await notification.send([recipient])
})
