import firebase from 'firebase'
import { MembersScope } from './member'
import { WithId } from './types'

export interface Thread {
  orgId: string
  circleId: string
  userId: string
  title: string
  participantsScope: MembersScope
  participantsMembersIds: string[]
  createdAt: firebase.firestore.Timestamp
  archived: boolean
  lastActivityId?: string
  lastActivityDate?: firebase.firestore.Timestamp
}

export type ThreadEntry = WithId<Thread>
