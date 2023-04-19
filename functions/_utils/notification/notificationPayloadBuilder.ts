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

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
type NotificationPayloadBuilder<Data extends any> = NotificationCommonPayload &
  Data

export type MeetingStartedNotificationPayload =
  NotificationPayloadBuilder<NotificationEmailPayload>

export type MeetingInvitedNotificationPayload =
  NotificationPayloadBuilder<NotificationEmailPayload>

export type TaskAssignedNotificationPayload =
  NotificationPayloadBuilder<NotificationEmailPayload>

export type ThreadNotificationPayload =
  NotificationPayloadBuilder<NotificationEmailPayload>

export type ThreadActivityNotificationPayload = NotificationPayloadBuilder<
  NotificationEmailPayload & NotificationDigestPayload
>
