import { WithId } from './types'

export enum MeetingStepTypes {
  Tour = 'Tour',
  Threads = 'Threads',
  Checklist = 'Checklist',
  Indicators = 'Indicators',
  Tasks = 'Tasks',
}

interface MeetingStepBase {
  notes: string
}

export interface MeetingStepTour extends MeetingStepBase {
  type: MeetingStepTypes.Tour
  participants: MeetingStepParticipant[]
  currentMemberId: string
}

export interface MeetingStepThreads extends MeetingStepBase {
  type: MeetingStepTypes.Threads
  threadsIds: string[]
}

export interface MeetingStepChecklist extends MeetingStepBase {
  type: MeetingStepTypes.Checklist
}

export interface MeetingStepIndicators extends MeetingStepBase {
  type: MeetingStepTypes.Indicators
}

export interface MeetingStepTasks extends MeetingStepBase {
  type: MeetingStepTypes.Tasks
  tasksIds: string[]
}

export interface MeetingStepParticipant {
  memberId: string
  notes: string
  done: boolean
}

// Collection "steps" in meeting doc
// Id = stepsConfig's id
export type MeetingStep =
  | MeetingStepTour
  | MeetingStepThreads
  | MeetingStepChecklist
  | MeetingStepIndicators
  | MeetingStepTasks

export type MeetingStepEntry = WithId<MeetingStep>
