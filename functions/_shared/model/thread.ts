import { EntityWithParticipants, WithId } from './types'

export interface Thread extends EntityWithParticipants {
  orgId: string
  initiatorMemberId: string
  title: string
  createdAt: string
  archived: boolean
  lastActivityId?: string | null
  lastActivityDate?: string | null
}

export type ThreadEntry = WithId<Thread>
