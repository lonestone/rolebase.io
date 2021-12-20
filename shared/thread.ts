import firebase from 'firebase'
import { EntityWithParticipants, WithId } from './types'

export interface Thread extends EntityWithParticipants {
  orgId: string
  userId: string
  title: string
  createdAt: firebase.firestore.Timestamp
  archived: boolean
  lastActivityId?: string
  lastActivityDate?: firebase.firestore.Timestamp
}

export type ThreadEntry = WithId<Thread>
