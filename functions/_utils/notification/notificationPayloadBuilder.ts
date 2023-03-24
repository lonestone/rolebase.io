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
  titleSingular: string
  contentSingular: string
  titlePlural: string
  contentPlural: string
  digestKey?: string | null
}

type NotificationPayloadBuilder<Data extends any> = NotificationCommonPayload &
  Data

export type MeetingStartedNotificationPayload =
  NotificationPayloadBuilder<NotificationEmailPayload>

export type MeetingInvitedNotificationPayload =
  NotificationPayloadBuilder<NotificationEmailPayload>

export type TaskAssignedNotificationPayload = NotificationCommonPayload

export type ThreadNotificationPayload = NotificationCommonPayload

export type ThreadActivityNotificationPayload =
  NotificationPayloadBuilder<NotificationDigestPayload>
