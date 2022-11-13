import { WithId } from './types'

export enum ActivityType {
  Message = 'Message',
  Election = 'Election',
  Poll = 'Poll',
  Thread = 'Thread',
  Meeting = 'Meeting',
  Task = 'Task',
  Decision = 'Decision',
}

export interface ActivityBase {
  threadId: string
  userId: string
  createdAt: string
}

export interface ActivityMessage extends ActivityBase {
  type: ActivityType.Message
  data: {
    message: string
  }
}

export interface ActivityElection extends ActivityBase {
  type: ActivityType.Election
  data: {}
}

export interface ActivityPoll extends ActivityBase {
  type: ActivityType.Poll
  data: {
    question: string
    choices: PollChoice[]
    multiple: boolean
    minAnswers: number | null
    maxAnswers: number | null
    pointsPerUser: number | null
    randomize: boolean
    anonymous: boolean
    hideUntilEnd: boolean
    canAddChoice: boolean
    endDate: string | null
    endWhenAllVoted: boolean
  }
}

export interface PollChoice {
  title: string
}

export interface ActivityThread extends ActivityBase {
  type: ActivityType.Thread
  data: {
    entityId: string
  }
}

export interface ActivityMeeting extends ActivityBase {
  type: ActivityType.Meeting
  data: {
    entityId: string
  }
}

export interface ActivityTask extends ActivityBase {
  type: ActivityType.Task
  data: {
    entityId: string
  }
}

export interface ActivityDecision extends ActivityBase {
  type: ActivityType.Decision
  data: {
    entityId: string
  }
}

export type Activity =
  | ActivityMessage
  | ActivityMeeting
  | ActivityElection
  | ActivityPoll
  | ActivityThread
  | ActivityMeeting
  | ActivityTask
  | ActivityDecision

export type ActivityEntry = WithId<Activity>
