import { NotificationCategories } from '@shared/model/notification'
import i18n, { resources } from '@i18n'
import { Notification } from '@utils/notification/notificationBuilder'
import { MeetingStartedNotificationPayload } from '@utils/notification/notificationPayloadBuilder'
import { OrgFragment } from '@gql'

type MeetingStartedNotificationParameters = {
  org?: OrgFragment
  orgId: string
  meetingId: string
  title: string
  role: string
  sender: string
}

export class MeetingStartedNotification extends Notification<
  NotificationCategories.meetingstarted,
  MeetingStartedNotificationPayload
> {
  constructor(
    locale: keyof typeof resources,
    private readonly parameters: MeetingStartedNotificationParameters
  ) {
    super(NotificationCategories.meetingstarted, locale)
  }

  get payload(): MeetingStartedNotificationPayload {
    const { t } = i18n
    const i18nOptions = {
      lng: this.locale,
      replace: {
        role: this.parameters.role,
        title: this.parameters.title,
        sender: this.parameters.sender,
      },
    }

    const actionUrl = this.getActionUrl(
      NotificationCategories.meetingstarted,
      this.parameters.orgId,
      this.parameters.org,
      this.parameters.meetingId
    )

    return {
      title: t(
        'notifications.sendMeetingStartedNotification.title',
        i18nOptions
      ),
      content: t(
        'notifications.sendMeetingStartedNotification.content',
        i18nOptions
      ),
      actionUrl,
      notificationReceived: t(
        'notifications.common.email.notificationReceived',
        i18nOptions
      ),
      actionButton: t('notifications.common.action.openMeeting', i18nOptions),
      automaticEmail: t(
        'notifications.common.email.automaticEmail',
        i18nOptions
      ),
      unsubscribe: t('notifications.common.email.unsubscribe', i18nOptions),
    }
  }
}
