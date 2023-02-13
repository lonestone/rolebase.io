export interface NovuConfig {
  appId: string
  userKey: string
  expiration?: number
}

// Categories comes from Novu notification identifier which can be found in the admin panel
export enum NotificationCategories {
  threadmessage = 'threadmessage',
  taskassigned = 'taskassigned',
  meetinginvited = 'meetinginvited',
  meetingstarted = 'meetingstarted',
  roleassigned = 'roleassigned',
  decision = 'decision',
}

type NotificationCommonFields = {
  title: string
  content: string
  recipientMemberIds: string[]
  actionUrl?: string
}

type NotificationInAppFields = {
  topic?: string
}

type NotificationEmailFields = {
  notificationReceived: string
  actionButton: string
  automaticEmail: string
  unsubscribe: string
  // Default already set in Novu template panel
  appUrl?: string
}

type NotificationMeetingStartedFields = {}

export type NotificationBuilder<
  Category extends NotificationCategories,
  Data extends any
> = {
  category: Category
} & NotificationCommonFields &
  Data

type MeetingStartedNotificationFields = NotificationBuilder<
  NotificationCategories.meetingstarted,
  NotificationInAppFields &
    NotificationEmailFields &
    NotificationMeetingStartedFields
>

export type NotificationFields = MeetingStartedNotificationFields
