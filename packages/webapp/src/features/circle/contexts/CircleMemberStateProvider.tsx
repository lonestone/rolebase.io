import React, { useMemo, useState } from 'react'
import {
  CircleMemberContext,
  CircleMemberContextValue,
} from './CircleMemberContext'

interface State {
  circleId?: string
  memberId?: string
  parentId?: string
}

interface Props {
  children: React.ReactNode
}

export function CircleMemberStateProvider({ children }: Props) {
  const [state, setState] = useState<State>({})

  const value: CircleMemberContextValue = useMemo(
    () => ({
      circleId: state.circleId,
      memberId: state.memberId,
      parentId: state.parentId,
      canFocus: true,
      goTo(circleId?: string, memberId?: string, parentId?: string) {
        setState({ circleId, memberId, parentId })
      },
    }),
    [state]
  )

  return (
    <CircleMemberContext.Provider value={value}>
      {children}
    </CircleMemberContext.Provider>
  )
}
