export interface NovuConfig {
  appId: string
  userKey: string
  expiration?: number
}

// Categories comes from Novu notification identifier which can be found in the admin panel
export enum NotificationCategories {
  threadActivity = 'threadactivity',
  thread = 'thread',
  taskassigned = 'taskassigned',
  meetinginvited = 'meetinginvited',
  meetingstarted = 'meetingstarted',
  roleassigned = 'roleassigned',
  decision = 'decision',
}

export type MeetingStartedNotificationBodyParams = {
  recipientMemberIds?: string[]
  meetingId: string
}
