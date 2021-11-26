import firebase from 'firebase'
import { WithId } from './types'

export enum ActivityType {
  Message = 'Message',
  Meeting = 'Meeting',
  Proposal = 'Proposal',
  Election = 'Election',
  Poll = 'Poll',
  Decision = 'Decision',
}

interface ActivityBase {
  orgId: string
  threadId: string
  userId: string
  createdAt: firebase.firestore.Timestamp
}

export interface ActivityMessage extends ActivityBase {
  type: ActivityType.Message
  message: string
}

export interface ActivityMeeting extends ActivityBase {
  type: ActivityType.Meeting
}

export interface ActivityProposal extends ActivityBase {
  type: ActivityType.Proposal
}

export interface ActivityElection extends ActivityBase {
  type: ActivityType.Election
}

export interface ActivityPoll extends ActivityBase {
  type: ActivityType.Poll
  question: string
  choices: PollChoice[]
  answers: PollAnswer[]
  multiple: boolean
  minAnswers: number | null
  maxAnswers: number | null
  pointsPerUser: number | null
  randomize: boolean
  anonymous: boolean
  hideUntilEnd: boolean
  canAddChoice: boolean
  endDate: firebase.firestore.Timestamp | null
  endWhenAllVoted: boolean
}

export interface PollChoice {
  title: string
}

export interface PollAnswer {
  userId: string
  choicesIds: number[]
  createdAt: firebase.firestore.Timestamp
}

export interface ActivityDecision extends ActivityBase {
  type: ActivityType.Decision
  circleId: string
  decision: string
  explanation: string
}

export type Activity =
  | ActivityMessage
  | ActivityMeeting
  | ActivityProposal
  | ActivityElection
  | ActivityPoll
  | ActivityDecision

export type ActivityEntry = WithId<Activity>
