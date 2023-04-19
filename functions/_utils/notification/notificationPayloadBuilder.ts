type NotificationCommonPayload = {
  title: string
  content: string
  actionUrl?: string
}

type NotificationEmailPayload = {
  notificationReceived: string
  actionButton: string
  automaticEmail: string
  unsubscribe: string
  // Default already set in Novu template panel
  appUrl?: string
}

type NotificationDigestPayload = {
  digestContentSingular: string
  digestContentPlural: string
  digestKey?: string | null
}

type NotificationPushPayload = {
  fcmTag: string
}

type NotificationPayloadBuilder<Data extends any> = NotificationCommonPayload &
  Data

export type MeetingStartedNotificationPayload = NotificationPayloadBuilder<
  NotificationEmailPayload & NotificationPushPayload
>

export type MeetingInvitedNotificationPayload = NotificationPayloadBuilder<
  NotificationEmailPayload & NotificationPushPayload
>

export type TaskAssignedNotificationPayload = NotificationPayloadBuilder<
  NotificationEmailPayload & NotificationPushPayload
>

export type ThreadNotificationPayload = NotificationPayloadBuilder<
  NotificationEmailPayload & NotificationPushPayload
>

export type ThreadActivityNotificationPayload = NotificationPayloadBuilder<
  NotificationEmailPayload & NotificationDigestPayload & NotificationPushPayload
>
