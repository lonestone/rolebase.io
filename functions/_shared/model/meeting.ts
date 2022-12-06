import { MeetingStepTypes } from './meeting_step'
import { EntityWithParticipants, WithId } from './types'

export interface Meeting extends EntityWithParticipants {
  orgId: string
  createdAt: string
  startDate: string
  endDate: string
  ended: boolean
  title: string
  // List of participants with status, set at meeting start
  attendees?: MeetingAttendee[] | null
  // Config of steps. Steps contents are stored in a "steps" collection
  stepsConfig: MeetingStepConfig[]
  //  Current step when meeting is started and not ended
  currentStepId?: string | null
  archived: boolean
  // True for integrated videoconference, or custom URL
  videoConf?: VideoConf | null
  // Instance of a recurring meeting?
  recurringId?: string | null
  recurringDate?: string | null
}

export type MeetingEntry = WithId<Meeting>

export interface MeetingStepConfig {
  id: string
  type: MeetingStepTypes
  title: string
}

export interface MeetingAttendee {
  memberId: string
  // Represented circles
  circlesIds: string[]
  present: boolean | null
}

export type VideoConf =
  | {
      type: VideoConfTypes.Url
      url: string
    }
  | {
      type: VideoConfTypes.Jitsi
    }

export enum VideoConfTypes {
  Url = 'Url',
  Jitsi = 'Jitsi',
}
