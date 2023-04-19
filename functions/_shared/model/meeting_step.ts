/* eslint-disable @typescript-eslint/no-empty-interface */
import {
  MeetingStepFragment,
  Meeting_Step_Type_Enum,
  Task_Status_Enum,
} from '@gql'
import { TasksViewTypes } from './task'

/*** Meeting Step
 *
 * Codegen uses schema overrides and types from this file to generate types.
 * Please check those files if you want to change the schema.
 * - @shared/schema-overrides.gql
 * - codegen.yml
 */

// Tour
export interface MeetingStepDataTour {}

export interface MeetingStepTourFragment extends MeetingStepFragment {
  type: Meeting_Step_Type_Enum.Tour
  data: MeetingStepDataTour
}

// Threads
export interface MeetingStepDataThreads {
  threadsIds: string[]
}

export interface MeetingStepThreadsFragment extends MeetingStepFragment {
  type: Meeting_Step_Type_Enum.Threads
  data: MeetingStepDataThreads
}

// Checklist
export interface MeetingStepDataChecklist {}

export interface MeetingStepChecklistFragment extends MeetingStepFragment {
  type: Meeting_Step_Type_Enum.Checklist
  data: MeetingStepDataChecklist
}

// Indicators
export interface MeetingStepDataIndicators {}

export interface MeetingStepIndicatorsFragment extends MeetingStepFragment {
  type: Meeting_Step_Type_Enum.Indicators
  data: MeetingStepDataIndicators
}

// Tasks
export interface MeetingStepDataTasks {
  viewType: TasksViewTypes
  filterStatus: Task_Status_Enum | null
  filterMemberId: string | null
}

export interface MeetingStepTasksFragment extends MeetingStepFragment {
  type: Meeting_Step_Type_Enum.Tasks
  data: MeetingStepDataTasks
}

export type MeetingStepData =
  | MeetingStepDataTour
  | MeetingStepDataThreads
  | MeetingStepDataChecklist
  | MeetingStepDataIndicators
  | MeetingStepDataTasks
