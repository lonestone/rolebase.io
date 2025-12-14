import { createContext } from 'react'

export interface CircleMemberContextValue {
  circleId?: string
  memberId?: string
  parentId?: string
  canFocus: boolean
  goTo(circleId?: string, memberId?: string, parentId?: string): void
}

export const CircleMemberContext = createContext<
  CircleMemberContextValue | undefined
>(undefined)
