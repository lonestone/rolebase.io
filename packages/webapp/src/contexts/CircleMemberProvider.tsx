import { useDisclosure } from '@chakra-ui/react'
import { useNavigateOrg } from '@hooks/useNavigateOrg'
import CircleMemberModal from '@organisms/circle/CircleMemberModal'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  CircleMemberContext,
  CircleMemberContextValue,
} from './CircleMemberContext'

interface State {
  circleId?: string
  memberId?: string
}

export function getCircleMemberUrlSearch(circleId?: string, memberId?: string) {
  if (circleId && memberId) {
    return `?circleId=${circleId}&memberId=${memberId}`
  } else if (circleId) {
    return `?circleId=${circleId}`
  } else if (memberId) {
    return `?memberId=${memberId}`
  }
  return ''
}

interface Props {
  stateOnly?: boolean
  children: React.ReactNode
}

export function CircleMemberProvider({ stateOnly, children }: Props) {
  const navigateOrg = useNavigateOrg()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [state, setState] = useState<State>({})

  const value: CircleMemberContextValue = useMemo(
    () => ({
      circleId: state.circleId,
      memberId: state.memberId,
      goTo(circleId?: string, memberId?: string) {
        setState({ circleId, memberId })
      },
    }),
    [state]
  )

  useEffect(() => {
    if (stateOnly) return
    if (!state.circleId && !state.memberId) return

    // Detect if at least one modal is open
    const hasModal = !!document.getElementsByClassName(
      'chakra-modal__content'
    )[0]
    const hasGraph = !!document.querySelector('svg .panzoom')
    if (hasModal || !hasGraph) {
      // Open modal
      onOpen()
      return
    }

    // Navigate to circle member page
    navigateOrg(
      `roles${getCircleMemberUrlSearch(state.circleId, state.memberId)}`
    )
    // Reset state
    setState({})
  }, [state, stateOnly])

  const handleModalClose = useCallback(() => {
    onClose()
    setState({})
  }, [])

  return (
    <CircleMemberContext.Provider value={value}>
      {children}

      {isOpen && (
        <CircleMemberModal
          circleId={state.circleId}
          memberId={state.memberId}
          isOpen
          onClose={handleModalClose}
        />
      )}
    </CircleMemberContext.Provider>
  )
}
