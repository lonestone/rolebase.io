import { OrgFragment } from '@gql'
import i18n, { resources } from '@i18n'
import { NotificationCategories } from '@shared/model/notification'
import { Notification } from '@utils/notification/notificationBuilder'
import { ThreadNotificationPayload } from '@utils/notification/notificationPayloadBuilder'

type ThreadNotificationParameters = {
  org?: OrgFragment
  orgId: string
  threadId: string
  title: string
  role: string
}

export class ThreadNotification extends Notification<
  NotificationCategories.thread,
  ThreadNotificationPayload
> {
  constructor(
    locale: keyof typeof resources,
    private readonly parameters: ThreadNotificationParameters
  ) {
    super(NotificationCategories.thread, locale)
  }

  get payload(): ThreadNotificationPayload {
    const { t } = i18n
    const i18nOptions = {
      lng: this.locale,
      replace: {
        role: this.parameters.role,
        title: this.parameters.title,
      },
    }

    const actionUrl = this.getActionUrl(
      NotificationCategories.thread,
      this.parameters.orgId,
      this.parameters.org,
      this.parameters.threadId
    )

    return {
      title: t('notifications.sendThreadNotification.title', i18nOptions),
      content: t('notifications.sendThreadNotification.content', i18nOptions),
      actionUrl,
      notificationReceived: t(
        'notifications.common.email.notificationReceived',
        i18nOptions
      ),
      actionButton: t('notifications.common.action.openThread', i18nOptions),
      automaticEmail: t(
        'notifications.common.email.automaticEmail',
        i18nOptions
      ),
      unsubscribe: t('notifications.common.email.unsubscribe', i18nOptions),
    }
  }
}
