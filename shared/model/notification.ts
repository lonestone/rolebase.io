export interface MagicbellConfig {
  apiKey: string
  userKey: string
}

export enum NotificationCategories {
  ThreadMessage = 'ThreadMessage',
  TaskAssigned = 'TaskAssigned',
  MeetingInvited = 'MeetingInvited',
  MeetingStarted = 'MeetingStarted',
  RoleAssigned = 'RoleAssigned',
  Decision = 'Decision',
}

export interface NotificationPayload {
  category: NotificationCategories
  recipientMemberIds: string[]
  title: string
  content: string
  url?: string
  topic?: string
}
