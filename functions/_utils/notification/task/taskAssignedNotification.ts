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
    const i18nOptions = {
      lng: this.locale,
      replace: {
        role: this.parameters.role,
        title: this.parameters.title,
      },
    }

    const actionUrl = this.getActionUrl(
      NotificationCategories.taskassigned,
      this.parameters.orgId,
      this.parameters.org,
      this.parameters.taskId
    )

    return {
      title: t('notifications.sendTaskAssignedNotification.title', i18nOptions),
      content: t(
        'notifications.sendTaskAssignedNotification.content',
        i18nOptions
      ),
      actionUrl,
      notificationReceived: t(
        'notifications.common.email.notificationReceived',
        i18nOptions
      ),
      actionButton: t('notifications.common.action.openTask', i18nOptions),
      automaticEmail: t(
        'notifications.common.email.automaticEmail',
        i18nOptions
      ),
      unsubscribe: t('notifications.common.email.unsubscribe', i18nOptions),
      fcmTag: this.parameters.taskId,
    }
  }
}
