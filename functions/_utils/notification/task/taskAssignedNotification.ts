import { NotificationCategories } from '@shared/model/notification'
import i18n, { resources } from '@i18n'
import { Notification } from '@utils/notification/notificationBuilder'
import { OrgFragment } from '@gql'
import { TaskAssignedNotificationPayload } from '@utils/notification/notificationPayloadBuilder'

type TaskAssignedNotificationParameters = {
  org?: OrgFragment
  orgId: string
  taskId: string
  title: string
  role: string
}

export class TaskAssignedNotification extends Notification<
  NotificationCategories.taskassigned,
  TaskAssignedNotificationPayload
> {
  constructor(
    locale: keyof typeof resources,
    private readonly parameters: TaskAssignedNotificationParameters
  ) {
    super(NotificationCategories.taskassigned, locale)
  }

  get payload(): TaskAssignedNotificationPayload {
    const { t } = i18n

    const actionUrl = this.getActionUrl(
      NotificationCategories.taskassigned,
      this.parameters.orgId,
      this.parameters.org,
      this.parameters.taskId
    )

    return {
      title: t('notifications.sendTaskAssignedNotification.title', {
        lng: this.locale,
        replace: {
          role: this.parameters.role,
        },
      }),
      content: t('notifications.sendTaskAssignedNotification.content', {
        lng: this.locale,
        replace: {
          title: this.parameters.title,
        },
      }),
      actionUrl,
    }
  }
}
