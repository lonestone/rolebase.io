import firebase from 'firebase/app'
import { WithId } from './types'

export interface Member {
  orgId: string
  name: string
  picture?: string | null
  userId?: string | null
  inviteEmail?: string
  inviteDate?: firebase.firestore.Timestamp | null
  workedMinPerWeek?: number | null
}

export type MemberEntry = WithId<Member>

export enum MembersScope {
  // All members of the organization
  Organization = 'Organization',
  // All Leaders of Roles and sub-Circles in Circle
  CircleLeaders = 'CircleLeaders',
  // All members in Circle and sub-Circles
  CircleMembers = 'CircleMembers',
  // None (select members manually)
  None = 'None',
}

export interface Participant {
  circleId: string
  memberId: string
}

// Collection of thread status inside poll
// Index by memberId
export interface MemberThreadStatus {
  lastReadActivityId: string
  lastReadDate: firebase.firestore.Timestamp
}
