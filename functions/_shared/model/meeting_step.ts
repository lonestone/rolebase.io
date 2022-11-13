import { TaskStatus, TasksViewTypes } from './task'
import { WithId } from './types'

export enum MeetingStepTypes {
  Tour = 'Tour',
  Threads = 'Threads',
  Checklist = 'Checklist',
  Indicators = 'Indicators',
  Tasks = 'Tasks',
}

interface MeetingStepBase {
  meetingId: string
  stepConfigId: string
  notes: string
  notesUpdates?: string | null
}

export interface MeetingStepTour extends MeetingStepBase {
  type: MeetingStepTypes.Tour
  data: {}
}

export interface MeetingStepThreads extends MeetingStepBase {
  type: MeetingStepTypes.Threads
  data: {
    threadsIds: string[]
  }
}

export interface MeetingStepChecklist extends MeetingStepBase {
  type: MeetingStepTypes.Checklist
  data: {}
}

export interface MeetingStepIndicators extends MeetingStepBase {
  type: MeetingStepTypes.Indicators
  data: {}
}

export interface MeetingStepTasks extends MeetingStepBase {
  type: MeetingStepTypes.Tasks
  data: {
    viewType: TasksViewTypes
    filterStatus: TaskStatus | null
    filterMemberId: string | null
  }
}

export type MeetingStep =
  | MeetingStepTour
  | MeetingStepThreads
  | MeetingStepChecklist
  | MeetingStepIndicators
  | MeetingStepTasks

export type MeetingStepEntry = WithId<MeetingStep>
