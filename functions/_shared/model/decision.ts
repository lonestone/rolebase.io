import { WithId } from './types'

export interface Decision {
  orgId: string
  circleId: string
  memberId: string
  title: string
  description: string
  archived: boolean
  createdAt: string
}

export type DecisionEntry = WithId<Decision>
