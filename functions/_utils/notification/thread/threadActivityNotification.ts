import { NotificationCategories } from '@shared/model/notification'
import i18n, { resources } from '@i18n'
import { Notification } from '@utils/notification/notificationBuilder'
import { ThreadActivityNotificationPayload } from '@utils/notification/notificationPayloadBuilder'
import { OrgFragment } from '@gql'

type ThreadActivityNotificationParameters = {
  org?: OrgFragment
  orgId: string
  threadId: string
  title: string
  role: string
}

export class ThreadActivityNotification extends Notification<
  NotificationCategories.threadActivity,
  ThreadActivityNotificationPayload
> {
  constructor(
    locale: keyof typeof resources,
    private readonly parameters: ThreadActivityNotificationParameters
  ) {
    super(NotificationCategories.threadActivity, locale)
  }

  get payload(): ThreadActivityNotificationPayload {
    const { t } = i18n
    const i18nOptions = {
      lng: this.locale,
      replace: {
        role: this.parameters.role,
        title: this.parameters.title,
      },
    }

    const actionUrl = this.getActionUrl(
      NotificationCategories.threadActivity,
      this.parameters.orgId,
      this.parameters.org,
      this.parameters.threadId
    )

    return {
      title: t(
        'notifications.sendThreadActivityNotification.title',
        i18nOptions
      ),
      content: t(
        'notifications.sendThreadActivityNotification.content',
        i18nOptions
      ),
      digestContentSingular: t(
        'notifications.sendThreadActivityNotification.digestContentSingular',
        i18nOptions
      ),
      digestContentPlural: t(
        'notifications.sendThreadActivityNotification.digestContentPlural',
        i18nOptions
      ),
      actionUrl,
      digestKey: this.parameters.threadId,
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
      fcmTag: `threadActivity-of-thread-${this.parameters.threadId}`,
    }
  }
}
