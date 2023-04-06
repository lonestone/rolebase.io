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
        title: this.parameters.title,
      },
    }

    const actionUrl = this.getActionUrl(
      NotificationCategories.threadActivity,
      this.parameters.orgId,
      this.parameters.org,
      this.parameters.threadId
    )

    const digestKey = this.getDigestKey(
      NotificationCategories.threadActivity,
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
      digestKey,
    }
  }
}
