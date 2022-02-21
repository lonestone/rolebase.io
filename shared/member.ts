import { Timestamp } from 'firebase/firestore'
import { WithId } from './types'
import { ClaimRole } from './userClaims'

export interface Member {
  orgId: string
  archived: boolean
  name: string
  picture?: string | null
  userId?: string | null
  inviteEmail?: string
  inviteDate?: Timestamp | null
  workedMinPerWeek?: number | null
  role?: ClaimRole
  meetingId: string | null
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

// Collection "threadStatus" in member doc
export interface MemberThreadStatus {
  lastReadActivityId: string
  lastReadDate: Timestamp
}
