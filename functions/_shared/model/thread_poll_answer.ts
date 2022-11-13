import { WithId } from './types'

export interface ThreadPollAnswer {
  activityId: string
  userId: string
  choicesPoints: number[] // Points distributed to each possible answer
  createdAt: string
}

export type ThreadPollAnswerEntry = WithId<ThreadPollAnswer>
