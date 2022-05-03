import { Box, Flex, useColorMode } from '@chakra-ui/react'
import ModalPanel from '@components/atoms/ModalPanel'
import { Title } from '@components/atoms/Title'
import CirclesKeyboardShortcuts from '@components/molecules/CirclesKeyboardShortcuts'
import CircleContent from '@components/organisms/CircleContent'
import MemberContent from '@components/organisms/MemberContent'
import useCurrentOrg from '@hooks/useCurrentOrg'
import { useElementSize } from '@hooks/useElementSize'
import { useNavigateOrg } from '@hooks/useNavigateOrg'
import useOverflowHidden from '@hooks/useOverflowHidden'
import useQueryParams from '@hooks/useQueryParams'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import CirclesGraph from '../organisms/CirclesGraph'

type CirclesPageParams = {
  circleId: string
  memberId: string
}

enum Panels {
  None,
  Circle,
  Member,
}

// Make colorMode available for functions outside of React component
export let lastColorMode: 'light' | 'dark' | undefined

export default function CirclesPage() {
  useOverflowHidden()

  const queryParams = useQueryParams<CirclesPageParams>()
  const navigateOrg = useNavigateOrg()
  const org = useCurrentOrg()
  const [ready, setReady] = useState(false)

  // Content size
  const boxRef = useRef<HTMLDivElement>(null)
  const boxSize = useElementSize(boxRef)

  // Panels
  const [panel, setPanel] = useState<Panels>(Panels.None)
  const [circleId, setCircleId] = useState<string | undefined>()
  const [memberId, setMemberId] = useState<string | null | undefined>()

  const handleClosePanel = useCallback(() => navigateOrg(), [])

  // URL params
  useEffect(() => {
    if (!ready) return

    // Focus circle
    setCircleId(queryParams.circleId)

    // Open panel
    if (queryParams.memberId) {
      setMemberId(queryParams.memberId)
      setPanel(Panels.Member)
    } else if (queryParams.circleId) {
      setPanel(Panels.Circle)
    } else {
      setPanel(Panels.None)
    }
  }, [ready, JSON.stringify(queryParams)])

  // Color mode
  const { colorMode } = useColorMode()
  if (colorMode !== lastColorMode) {
    lastColorMode = colorMode
  }

  return (
    <Flex flex={1} position="relative" overflow="hidden">
      <Box flex={1} ref={boxRef}>
        {org && boxSize && (
          <CirclesGraph
            key={colorMode}
            width={boxSize.width}
            height={boxSize.height}
            selectedCircleId={circleId}
            onReady={() => setReady(true)}
          />
        )}
      </Box>

      {panel === Panels.Circle && circleId && (
        <ModalPanel onClose={handleClosePanel}>
          <CircleContent id={circleId} changeTitle />
        </ModalPanel>
      )}

      {panel === Panels.Member && memberId && (
        <ModalPanel onClose={handleClosePanel}>
          <MemberContent
            id={memberId}
            selectedCircleId={circleId || undefined}
            changeTitle
          />
        </ModalPanel>
      )}

      {panel === Panels.None && org && <Title>{org.name}</Title>}

      <CirclesKeyboardShortcuts position="absolute" left={3} bottom={3} />
    </Flex>
  )
}
