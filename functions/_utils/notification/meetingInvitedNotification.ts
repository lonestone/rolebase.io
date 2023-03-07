import { NotificationCategories } from '@shared/model/notification'
import i18n, { resources } from '@i18n'
import { Notification } from '@utils/notification/notificationBuilder'
import { MeetingInvitedNotificationPayload } from '@utils/notification/notificationPayloadBuilder'

type MeetingInvitedNotificationParameters = {
  isRecurring: boolean
  title: string
  role: string
  sender: string
  actionUrl: string
}

export class MeetingInvitedNotification extends Notification<
  NotificationCategories.meetinginvited,
  MeetingInvitedNotificationPayload
> {
  constructor(
    locale: keyof typeof resources,
    private readonly parameters: MeetingInvitedNotificationParameters
  ) {
    super(NotificationCategories.meetinginvited, locale)
  }

  get payload(): MeetingInvitedNotificationPayload {
    const { t } = i18n

    return {
      title: t(
        `notifications.sendMeetingInvitedNotification.${
          this.parameters.isRecurring ? 'recurringMeetingtitle' : 'title'
        }`,
        {
          lng: this.locale,
          replace: {
            role: this.parameters.role,
            title: this.parameters.title,
          },
        }
      ),
      content: t(
        `notifications.sendMeetingInvitedNotification.${
          this.parameters.isRecurring ? 'recurringMeetingcontent' : 'content'
        }`,
        {
          lng: this.locale,
          replace: {
            sender: this.parameters.sender,
          },
        }
      ),
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
