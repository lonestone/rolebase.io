import { useDisclosure } from '@chakra-ui/react'
import CircleMemberModal from '@components/organisms/circle/CircleMemberModal'
import { useNavigateOrg } from '@hooks/useNavigateOrg'
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

export const CircleMemberProvider: React.FC = ({ children }) => {
  const navigateOrg = useNavigateOrg()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [circleId, setCircleId] = useState<string | undefined>()
  const [memberId, setMemberId] = useState<string | undefined>()

  const value = useMemo(
    () => ({
      goTo(circleId?: string, memberId?: string) {
        setCircleId(circleId)
        setMemberId(memberId)
      },
    }),
    []
  )

  useEffect(() => {
    if (!circleId && !memberId) return
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
      navigateOrg(getCircleMemberUrlSearch(circleId, memberId))
      setCircleId(undefined)
      setMemberId(undefined)
    }
  }, [circleId, memberId])

  const handleModalClose = useCallback(() => {
    onClose()
    setCircleId(undefined)
    setMemberId(undefined)
  }, [])

  return (
    <CircleMemberContext.Provider value={value}>
      {children}

      {isOpen && (
        <CircleMemberModal
          circleId={circleId}
          memberId={memberId}
          isOpen
          onClose={handleModalClose}
        />
      )}
    </CircleMemberContext.Provider>
  )
}
