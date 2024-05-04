import { useNavigateOrg } from '@/org/hooks/useNavigateOrg'
import { useDisclosure } from '@chakra-ui/react'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import CircleMemberModal from '../modals/CircleMemberModal'
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
  children: React.ReactNode
}

export function CircleMemberProvider({ children }: Props) {
  const navigateOrg = useNavigateOrg()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [state, setState] = useState<State>({})
  const location = useLocation()

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
    if (!state.circleId && !state.memberId) return

    // Detect if at least one modal is open
    const hasModal = !!document.getElementsByClassName(
      'chakra-modal__content'
    )[0]
    const isGraphPage = /\/(roles|news)$/.test(location.pathname)
    if (hasModal || !isGraphPage) {
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
  }, [state])

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
