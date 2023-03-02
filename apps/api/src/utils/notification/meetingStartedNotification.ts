import { NotificationCategories } from '@shared/model/notification'
import i18n, { resources } from '@i18n'
import { Notification } from '@utils/notification/notificationBuilder'
import { MeetingStartedNotificationPayload } from '@utils/notification/notificationPayloadBuilder'

type MeetingStartedNotificationParameters = {
  title: string
  role: string
  sender: string
  actionUrl: string
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

    return {
      title: t('notifications.sendMeetingStartedNotification.title', {
        lng: this.locale,
        replace: {
          role: this.parameters.role,
          title: this.parameters.title,
        },
      }),
      content: t('notifications.sendMeetingStartedNotification.content', {
        lng: this.locale,
        replace: {
          sender: this.parameters.sender,
        },
      }),
      actionUrl: this.parameters.actionUrl,
      notificationReceived: t(
        'notifications.common.email.notificationReceived',
        {
          lng: this.locale,
        }
      ),
      actionButton: t('notifications.common.action.openMeeting', {
        lng: this.locale,
      }),
      automaticEmail: t('notifications.common.email.automaticEmail', {
        lng: this.locale,
      }),
      unsubscribe: t('notifications.common.email.unsubscribe', {
        lng: this.locale,
      }),
    }
  }
}
