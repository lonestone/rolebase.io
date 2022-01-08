import firebase from 'firebase/app'
import { MeetingStepTypes } from './meetingStep'
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
  currentStepId: string | null
  archived: boolean
}

export type MeetingEntry = WithId<Meeting>

export interface MeetingStepConfig {
  id: string
  type: MeetingStepTypes
  title: string
}
