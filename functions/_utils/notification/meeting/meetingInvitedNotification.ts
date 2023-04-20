import { NotificationCategories } from '@shared/model/notification'
import i18n, { resources } from '@i18n'
import { Notification } from '@utils/notification/notificationBuilder'
import { MeetingInvitedNotificationPayload } from '@utils/notification/notificationPayloadBuilder'
import settings from '@utils/settings'
import { getOrgPath } from '@shared/helpers/getOrgPath'
import { OrgFragment } from '@gql'

export type MeetingInvitedNotificationParameters = {
  org?: OrgFragment
  orgId: string
  meetingId: string
  title: string
  role: string
  sender: string
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

  get actionUrl(): string {
    return `${settings.url}${
      this.parameters.org
        ? getOrgPath(this.parameters.org)
        : `/orgs/${this.parameters.orgId}`
    }/meetings/${this.parameters.meetingId}`
  }

  get payload(): MeetingInvitedNotificationPayload {
    const { t } = i18n
    const i18nOptions = {
      lng: this.locale,
      replace: {
        role: this.parameters.role,
        title: this.parameters.title,
        sender: this.parameters.sender,
      },
    }

    return {
      title: t(
        'notifications.sendMeetingInvitedNotification.title',
        i18nOptions
      ),
      content: t(
        'notifications.sendMeetingInvitedNotification.content',
        i18nOptions
      ),
      actionUrl: this.actionUrl,
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
      fcmTag: this.parameters.meetingId,
    }
  }
}
