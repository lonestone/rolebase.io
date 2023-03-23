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

type NotificationPayloadBuilder<Data extends any> = NotificationCommonPayload &
  Data

export type MeetingStartedNotificationPayload = NotificationPayloadBuilder<
  NotificationInAppPayload & NotificationEmailPayload
>

export type MeetingInvitedNotificationPayload = NotificationPayloadBuilder<
  NotificationInAppPayload & NotificationEmailPayload
>

export type TaskAssignedNotificationPayload =
  NotificationPayloadBuilder<NotificationInAppPayload>
