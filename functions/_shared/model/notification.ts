export interface NovuConfig {
  appId: string
  userKey: string
  expiration?: number
}

// Categories comes from Novu notification identifier which can be found in the admin panel
export enum NotificationCategories {
  ThreadMessage = 'ThreadMessage',
  TaskAssigned = 'TaskAssigned',
  meetinginvited = 'meetinginvited',
  meetingstarted = 'meetingstarted',
  RoleAssigned = 'RoleAssigned',
  Decision = 'Decision',
}
