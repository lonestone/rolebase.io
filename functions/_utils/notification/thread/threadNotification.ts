import { NotificationCategories } from '@shared/model/notification'
import i18n, { resources } from '@i18n'
import { Notification } from '@utils/notification/notificationBuilder'
import { ThreadNotificationPayload } from '@utils/notification/notificationPayloadBuilder'
import { OrgFragment } from '@gql'

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

    const actionUrl = this.getActionUrl(
      NotificationCategories.thread,
      this.parameters.orgId,
      this.parameters.org,
      this.parameters.threadId
    )

    return {
      title: t('notifications.sendThreadNotification.title', {
        lng: this.locale,
        replace: {
          role: this.parameters.role,
        },
      }),
      content: t('notifications.sendThreadNotification.content', {
        lng: this.locale,
        replace: {
          title: this.parameters.title,
        },
      }),
      actionUrl,
    }
  }
}
