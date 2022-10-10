import { WithId } from './types'

export interface ThreadMemberStatus {
  threadId: string
  memberId: string
  lastReadActivityId: string
  lastReadDate: string
}

export type ThreadEntry = WithId<ThreadMemberStatus>
