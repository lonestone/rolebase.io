import ModalPanel, { modalPanelWidth } from '@atoms/ModalPanel'
import { Title } from '@atoms/Title'
import {
  Box,
  ButtonProps,
  HStack,
  useColorMode,
  useMediaQuery,
} from '@chakra-ui/react'
import { GraphZoomProvider } from '@contexts/GraphZoomContext'
import { SidebarContext } from '@contexts/SidebarContext'
import useCurrentOrg from '@hooks/useCurrentOrg'
import { useElementSize } from '@hooks/useElementSize'
import useCirclesEvents from '@hooks/useGraphEvents'
import { useNavigateOrg } from '@hooks/useNavigateOrg'
import useOverflowHidden from '@hooks/useOverflowHidden'
import useQueryParams from '@hooks/useQueryParams'
import CirclesKeyboardShortcuts from '@molecules/circle/CirclesKeyboardShortcuts'
import CirclesSettings from '@molecules/circle/CirclesSettings'
import GraphViewsSelect from '@molecules/circle/GraphViewsSelect'
import CircleContent from '@organisms/circle/CircleContent'
import CirclesGraph from '@organisms/circle/CirclesGraph'
import MemberContent from '@organisms/member/MemberContent'
import { useStoreState } from '@store/hooks'
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { GraphViews } from 'src/circles-viz/types'

type CirclesPageParams = {
  circleId: string
  memberId: string
}

enum Panels {
  None,
  Circle,
  Member,
}

const menuButtonProps: Partial<Omit<ButtonProps, 'value' | 'onChange'>> = {
  boxShadow: 'md',
  bg: 'white',
  _dark: {
    bg: 'gray.700',
  },
  _focus: {
    boxShadow: 'md !important',
  },
}

export default function CirclesPage() {
  useOverflowHidden()

  const queryParams = useQueryParams<CirclesPageParams>()
  const navigateOrg = useNavigateOrg()
  const org = useCurrentOrg()
  const sidebarContext = useContext(SidebarContext)
  const [ready, setReady] = useState(false)

  // Content size
  const boxRef = useRef<HTMLDivElement>(null)
  const boxSize = useElementSize(boxRef)
  const [isSmallScreen] = useMediaQuery('(max-width: 450px)')

  // Panels
  const [panel, setPanel] = useState<Panels>(Panels.None)
  const [view, setView] = useState(GraphViews.AllCircles)
  const [circleId, setCircleId] = useState<string | undefined>()
  const [memberId, setMemberId] = useState<string | null | undefined>()

  // Data
  const circles = useStoreState((state) => state.org.circles)
  const events = useCirclesEvents()

  const handleClosePanel = useCallback(() => navigateOrg(), [])

  // Zoom offsets when focusing
  const focusCrop = useMemo(
    () =>
      sidebarContext
        ? {
            top: 0,
            left: sidebarContext.width,
            right:
              sidebarContext.height || panel === Panels.None
                ? 0
                : modalPanelWidth,
            bottom: 0,
          }
        : undefined,
    [sidebarContext?.width, sidebarContext?.height, panel]
  )

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

  return (
    <GraphZoomProvider>
      <Box
        ref={boxRef}
        position="absolute"
        top={0}
        left={`-${sidebarContext?.width || 0}px`}
        bottom={0}
        right={0}
        overflow="hidden"
      >
        {org && circles && boxSize && (
          <CirclesGraph
            key={view + colorMode}
            view={view}
            id={`graph-${org.id}`}
            circles={circles}
            events={events}
            width={boxSize.width}
            height={boxSize.height}
            focusCrop={focusCrop}
            selectedCircleId={circleId}
            onReady={() => setReady(true)}
          />
        )}
      </Box>

      {panel === Panels.Circle && circleId && (
        <ModalPanel isOpen onClose={handleClosePanel}>
          <CircleContent
            id={circleId}
            changeTitle
            extendBottom={!isSmallScreen}
            isFirstTabOpen={!isSmallScreen}
          />
        </ModalPanel>
      )}

      {panel === Panels.Member && memberId && (
        <ModalPanel isOpen onClose={handleClosePanel}>
          <MemberContent
            id={memberId}
            selectedCircleId={circleId || undefined}
            changeTitle
          />
        </ModalPanel>
      )}

      {panel === Panels.None && org && <Title>{org.name}</Title>}

      <HStack p={2}>
        <Box>
          <GraphViewsSelect
            value={view}
            onChange={setView}
            {...menuButtonProps}
          />
        </Box>
        <Box>
          <CirclesKeyboardShortcuts {...menuButtonProps} />
        </Box>
        <Box>
          <CirclesSettings {...menuButtonProps} />
        </Box>
      </HStack>
    </GraphZoomProvider>
  )
}
