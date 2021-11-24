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
  draft: boolean
  archived: boolean
}

export type ThreadEntry = WithId<Thread>
