import firebase from 'firebase'
import { WithId } from './types'

export interface Task {
  orgId: string
  circleId: string
  memberId: string
  title: string
  description: string
  archived: boolean
  createdAt: firebase.firestore.Timestamp
  dueDate: firebase.firestore.Timestamp | null
  doneDate: firebase.firestore.Timestamp | null
}

export type TaskEntry = WithId<Task>
