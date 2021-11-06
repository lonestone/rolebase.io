import { WithId } from './types'

export enum ThreadActivityType {
  Message = 'Message',
  Meeting = 'Meeting',
  Proposal = 'Proposal',
  Election = 'Election',
  Poll = 'Poll',
  Decision = 'Decision',
}

interface ThreadActivityBase {
  threadId: string
  userId: string
  createdAt: Date
}

export interface ThreadActivityMessage extends ThreadActivityBase {
  type: ThreadActivityType.Message
  message: string
}
export interface ThreadActivityMeeting extends ThreadActivityBase {
  type: ThreadActivityType.Meeting
}
export interface ThreadActivityProposal extends ThreadActivityBase {
  type: ThreadActivityType.Proposal
}
export interface ThreadActivityElection extends ThreadActivityBase {
  type: ThreadActivityType.Election
}
export interface ThreadActivityPoll extends ThreadActivityBase {
  type: ThreadActivityType.Poll
}
export interface ThreadActivityDecision extends ThreadActivityBase {
  type: ThreadActivityType.Decision
}

export type ThreadActivity =
  | ThreadActivityMessage
  | ThreadActivityMeeting
  | ThreadActivityProposal
  | ThreadActivityElection
  | ThreadActivityPoll
  | ThreadActivityDecision

export type ThreadActivityEntry = WithId<ThreadActivity>
