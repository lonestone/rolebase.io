import { createContext } from 'react'

export interface CircleMemberContextValue {
  circleId?: string
  memberId?: string
  goTo(circleId?: string, memberId?: string): void
}

export const CircleMemberContext = createContext<
  CircleMemberContextValue | undefined
>(undefined)
