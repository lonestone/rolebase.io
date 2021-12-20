import firebase from 'firebase/app'
import { MembersScope } from './member'
import { WithId } from './types'

export interface Meeting {
  orgId: string
  circleId: string
  initiatorMemberId: string
  facilitatorMemberId: string
  participantsScope: MembersScope
  participantsMembersIds: string[]
  createdAt: firebase.firestore.Timestamp
  startDate: firebase.firestore.Timestamp
  endDate: firebase.firestore.Timestamp
  ended: boolean
  title: string
  stepsConfig: MeetingStepConfig[]
  currentStepIndex: number
}

export type MeetingEntry = WithId<Meeting>

export interface MeetingStepConfig {
  type: MeetingStepTypes
  title: string
}

export enum MeetingStepTypes {
  Tour = 'Tour',
  Threads = 'Threads',
  Checklist = 'Checklist',
  Indicators = 'Indicators',
  Tasks = 'Tasks',
}

// Collection "steps" in meeting doc
// Id = stepsConfig index to string
export type MeetingStep = {
  notes: string
} & (
  | {
      type: MeetingStepTypes.Tour
      participants: MeetingStepParticipant[]
      currentMemberId: string
    }
  | {
      type: MeetingStepTypes.Threads
      threadsIds: string[]
    }
  | {
      type:
        | MeetingStepTypes.Checklist
        | MeetingStepTypes.Indicators
        | MeetingStepTypes.Tasks
    }
)

export interface MeetingStepParticipant {
  memberId: string
  notes: string
  done: boolean
}
