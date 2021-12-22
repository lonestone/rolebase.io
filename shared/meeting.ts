import firebase from 'firebase/app'
import { EntityWithParticipants, WithId } from './types'

export interface Meeting extends EntityWithParticipants {
  orgId: string
  initiatorMemberId: string
  facilitatorMemberId: string
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
  id: string
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
