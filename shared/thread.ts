import firebase from 'firebase'
import { WithId } from './types'

export interface Thread {
  orgId: string
  circleId: string
  userId: string
  title: string
  createdAt: firebase.firestore.Timestamp
  draft: boolean
  archived: boolean
}

export type ThreadEntry = WithId<Thread>
