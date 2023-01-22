import { ThreadActivityFragment, Thread_Activity_Type_Enum } from '@gql'

/*** Thread Activity
 *
 * Codegen uses schema overrides and types from this file to generate types.
 * Please check those files if you want to change the schema.
 * - @shared/schema-overrides.gql
 * - codegen.yml
 */

// Message
export interface ThreadActivityDataMessage {
  message: string
}

export interface ThreadActivityMessageFragment extends ThreadActivityFragment {
  type: Thread_Activity_Type_Enum.Message
  data: ThreadActivityDataMessage
}

// Poll
export interface ThreadActivityDataPoll {
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

export interface ThreadActivityPollFragment extends ThreadActivityFragment {
  type: Thread_Activity_Type_Enum.Poll
  data: ThreadActivityDataPoll
}

export interface PollChoice {
  title: string
}

// Thread
export interface ThreadActivityDataThread {
  entityId: string
}

export interface ThreadActivityThreadFragment extends ThreadActivityFragment {
  type: Thread_Activity_Type_Enum.Thread
  data: ThreadActivityDataThread
}

// Meeting
export interface ThreadActivityDataMeeting {
  entityId: string
}

export interface ThreadActivityMeetingFragment extends ThreadActivityFragment {
  type: Thread_Activity_Type_Enum.Meeting
  data: ThreadActivityDataMeeting
}

// Task
export interface ThreadActivityDataTask {
  entityId: string
}

export interface ThreadActivityTaskFragment extends ThreadActivityFragment {
  type: Thread_Activity_Type_Enum.Task
  data: ThreadActivityDataTask
}

// Decision
export interface ThreadActivityDataDecision {
  entityId: string
}

export interface ThreadActivityDecisionFragment extends ThreadActivityFragment {
  type: Thread_Activity_Type_Enum.Decision
  data: ThreadActivityDataDecision
}

export type ThreadActivityData =
  | ThreadActivityDataMessage
  | ThreadActivityDataPoll
  | ThreadActivityDataThread
  | ThreadActivityDataMeeting
  | ThreadActivityDataTask
  | ThreadActivityDataDecision
