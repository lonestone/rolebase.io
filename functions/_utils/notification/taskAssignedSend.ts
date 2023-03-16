import { TaskNotificationDataFragment } from '@gql'
import { defaultLang, resources } from '@i18n'
import { RouteError } from '@utils/route'
import { TaskAssignedNotification } from './taskAssignedNotification'

export async function taskAssignedSend(
  userId: string,
  task: TaskNotificationDataFragment
) {
  if (!userId || !task) {
    throw new RouteError(404, 'Bad request')
  }

  // Don't send notification if creator is the same person as assignee
  if (userId === task.org.members[0].user?.id) {
    return
  }

  const recipientLocale =
    (task.org.members[0].user?.locale as keyof typeof resources) || defaultLang

  const recipient = {
    subscriberId: task.org.members[0].user?.id!,
    email: task.org.members[0].user?.email!,
    locale: recipientLocale,
  }
  if (!recipient) {
    return
  }

  // Build MeetingStartedNotification instance for each recipient depending on its locale
  const notification = new TaskAssignedNotification(recipientLocale, {
    org: task.org,
    orgId: task.orgId,
    taskId: task.id,
    title: task?.title || '',
    role: task?.circle.role.name || '',
  })
  // Send notification "meetingstarted"
  await notification.send([recipient])
}
