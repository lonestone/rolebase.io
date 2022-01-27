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
  stepsConfig: MeetingStepConfig[]
  currentStepId: string | null
  archived: boolean
}

export type MeetingEntry = WithId<Meeting>

export interface MeetingStepConfig {
  id: string
  type: MeetingStepTypes
  title: string
}
