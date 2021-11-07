import { WithId } from './types'

export interface Thread {
  orgId: string
  circleId: string
  userId: string
  title: string
  createdAt: Date
  draft: boolean
  archived: boolean
}

export type ThreadEntry = WithId<Thread>
