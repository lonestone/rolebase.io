import { Timestamp } from 'firebase/firestore'
import { EntityWithParticipants, WithId } from './types'

export interface Thread extends EntityWithParticipants {
  orgId: string
  initiatorMemberId: string
  title: string
  createdAt: Timestamp
  archived: boolean
  lastActivityId?: string
  lastActivityDate?: Timestamp
}

export type ThreadEntry = WithId<Thread>
