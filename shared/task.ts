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
  status: TaskStatus
}

export type TaskEntry = WithId<Task>

export enum TaskStatus {
  Open = 'Open',
  InProgress = 'InProgress',
  InReview = 'InReview',
  Blocked = 'Blocked',
  Done = 'Done',
}
