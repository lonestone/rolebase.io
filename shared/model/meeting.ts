import { Timestamp } from 'firebase/firestore'
import { MeetingStepTypes } from './meetingStep'
import { EntityWithParticipants, WithId } from './types'

export interface Meeting extends EntityWithParticipants {
  orgId: string
  initiatorMemberId: string
  facilitatorMemberId: string
  createdAt: Timestamp
  startDate: Timestamp
  endDate: Timestamp
  ended: boolean
  title: string
  // List of participants with status, set at meeting start
  attendees?: MeetingAttendee[]
  // Config of steps. Steps contents are stored in a "steps" collection
  stepsConfig: MeetingStepConfig[]
  //  Current step when meeting is started and not ended
  currentStepId: string | null
  archived: boolean
  // True for integrated videoconference, or custom URL
  videoConf: boolean | string
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
