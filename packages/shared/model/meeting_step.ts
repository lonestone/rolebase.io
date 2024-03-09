import {
  MeetingStepFragment,
  Meeting_Step_Type_Enum,
  RoleFragment,
  Task_Status_Enum,
} from '../gql'
import { MeetingStepConfig } from './meeting'
import { TasksViewTypes } from './task'

/*** Meeting Step
 *
 * Codegen uses schema overrides and types from this file to generate types.
 * Please check those files if you want to change the schema.
 * - schema-overrides.gql
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

export function getDefaultMeetingStep(
  meetingId: string,
  stepConfig: MeetingStepConfig,
  role: RoleFragment
): Omit<MeetingStepFragment, 'id'> {
  const type = stepConfig.type
  const step = {
    meetingId,
    stepConfigId: stepConfig.id,
    notes: '',
    data: {},
  }

  switch (type) {
    case Meeting_Step_Type_Enum.Tour:
      return { ...step, type }

    case Meeting_Step_Type_Enum.Threads: {
      return {
        ...step,
        type,
        data: {
          threadsIds: [],
        },
      }
    }

    case Meeting_Step_Type_Enum.Tasks:
      return {
        ...step,
        type,
        data: {
          viewType: TasksViewTypes.Kanban,
          filterMemberId: null,
          filterStatus: null,
        },
      }

    case Meeting_Step_Type_Enum.Checklist:
      return {
        ...step,
        type,
        notes: role.checklist || '',
      }

    case Meeting_Step_Type_Enum.Indicators:
      return {
        ...step,
        type,
        notes: role.indicators || '',
      }
  }
}
