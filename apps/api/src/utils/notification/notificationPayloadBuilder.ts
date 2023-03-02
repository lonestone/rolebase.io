type NotificationCommonPayload = {
  title: string
  content: string
  actionUrl?: string
}

type NotificationInAppPayload = {}

type NotificationEmailPayload = {
  notificationReceived: string
  actionButton: string
  automaticEmail: string
  unsubscribe: string
  // Default already set in Novu template panel
  appUrl?: string
}

type NotificationMeetingStartedPayload = {}

type NotificationPayloadBuilder<Data extends any> = NotificationCommonPayload &
  Data

export type MeetingStartedNotificationPayload = NotificationPayloadBuilder<
  NotificationInAppPayload &
    NotificationEmailPayload &
    NotificationMeetingStartedPayload
>
