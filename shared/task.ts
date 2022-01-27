import { Timestamp } from 'firebase/firestore'
import { WithId } from './types'

export interface Task {
  orgId: string
  circleId: string
  memberId: string
  title: string
  description: string
  archived: boolean
  createdAt: Timestamp
  dueDate: Timestamp | null
  doneDate: Timestamp | null
}

export type TaskEntry = WithId<Task>
