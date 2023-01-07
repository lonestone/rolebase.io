import { useDisclosure } from '@chakra-ui/react'
import { useNavigateOrg } from '@hooks/useNavigateOrg'
import CircleMemberModal from '@organisms/circle/CircleMemberModal'
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

interface CircleMemberContextValue {
  goTo(circleId?: string, memberId?: string): void
}

interface State {
  circleId?: string
  memberId?: string
}

export const CircleMemberContext = createContext<
  CircleMemberContextValue | undefined
>(undefined)

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

interface CircleMemberProviderProps {
  children: React.ReactNode
}

export function CircleMemberProvider({ children }: CircleMemberProviderProps) {
  const navigateOrg = useNavigateOrg()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [state, setState] = useState<State>({})

  const value = useMemo(
    () => ({
      goTo(circleId?: string, memberId?: string) {
        setState({ circleId, memberId })
      },
    }),
    []
  )

  useEffect(() => {
    if (!state.circleId && !state.memberId) return
    // Detect if at least one modal is open
    const hasModal = !!document.getElementsByClassName(
      'chakra-modal__content'
    )[0]
    const hasGraph = !!document.querySelector('svg .panzoom')
    if (hasModal || !hasGraph) {
      // Open modal
      onOpen()
    } else {
      // Navigate to circle member page
      navigateOrg(getCircleMemberUrlSearch(state.circleId, state.memberId))
      // Reset state
      setState({})
    }
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
