import { TaskFragment } from '@gql'
import { defaultLang, resources } from '@i18n'
import { checkSendNotificationEvent } from '@utils/notification/checkSendNotificationEvent'
import { getNotificationTaskData } from '@utils/notification/task/getNotificationTaskData'
import { TaskAssignedNotification } from '@utils/notification/task/taskAssignedNotification'
import { route } from '@utils/route'

export default route(async (context): Promise<void> => {
  const {
    fullEvent: { event },
    senderUserId,
  } = checkSendNotificationEvent<TaskFragment>(context)

  // Check if task has a new assignee
  const oldTask = event.data.old
  const newTask = event.data.new
  if (!newTask!.memberId || newTask!.memberId === oldTask?.memberId) {
    return
  }

  // What needs to be done
  const notifData = await getNotificationTaskData(newTask!.id)

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
