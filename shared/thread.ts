import { WithId } from './types'

export interface Thread {
  title: string
  circleId: string
  createdAt: Date
  userId: string
  draft: boolean
  archived: boolean
}

export type ThreadEntry = WithId<Thread>
