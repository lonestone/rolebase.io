export interface MagicbellConfig {
  apiKey: string
  userKey: string
  expiration?: number
}

export enum NotificationCategories {
  ThreadMessage = 'ThreadMessage',
  TaskAssigned = 'TaskAssigned',
  MeetingInvited = 'MeetingInvited',
  MeetingStarted = 'MeetingStarted',
  RoleAssigned = 'RoleAssigned',
  Decision = 'Decision',
}
