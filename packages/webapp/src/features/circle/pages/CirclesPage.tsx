import ModalPanel, { modalPanelWidth } from '@/common/atoms/ModalPanel'
import { Title } from '@/common/atoms/Title'
import { useElementSize } from '@/common/hooks/useElementSize'
import useOverflowHidden from '@/common/hooks/useOverflowHidden'
import useQueryParams from '@/common/hooks/useQueryParams'
import CirclesCanvasGraph from '@/graph/CirclesCanvasGraph'
import CirclesSVGGraph from '@/graph/CirclesSVGGraph'
import { GraphProvider } from '@/graph/contexts/GraphContext'
import useCirclesEvents from '@/graph/hooks/useGraphEvents'
import { CirclesGraphViews } from '@/graph/types'
import { SidebarContext } from '@/layout/contexts/SidebarContext'
import MemberContent from '@/member/components/MemberContent'
import useCurrentOrg from '@/org/hooks/useCurrentOrg'
import { useNavigateOrg } from '@/org/hooks/useNavigateOrg'
import {
  Box,
  Button,
  HStack,
  useBreakpointValue,
  useColorMode,
} from '@chakra-ui/react'
import { useStoreState } from '@store/hooks'
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import CircleContent from '../components/CircleContent'
import CirclesSettings from '../components/CirclesSettings'
import GraphViewsSelect from '../components/GraphViewsSelect'
import { CircleProvider } from '../contexts/CIrcleContext'

type CirclesPageParams = {
  circleId: string
  memberId: string
}

enum Panels {
  None,
  Circle,
  Member,
}

const buttonsStyleProps = {
  variant: 'outline',
  size: 'sm',
  border: 0,
  bg: 'white',
  _hover: {
    bg: 'gray.100',
  },
  _active: {
    bg: 'gray.200',
  },
  _dark: {
    bg: 'gray.700',
    _hover: {
      bg: 'gray.600',
    },
    _active: {
      bg: 'gray.550',
    },
  },
}

export default function CirclesPage() {
  useOverflowHidden()
  const { t } = useTranslation()
  const sidebarContext = useContext(SidebarContext)

  const queryParams = useQueryParams<CirclesPageParams>()
  const navigateOrg = useNavigateOrg()
  const org = useCurrentOrg()
  const [beta, setBeta] = useState(false)
  const [ready, setReady] = useState(false)

  // Content size
  const boxRef = useRef<HTMLDivElement>(null)
  const boxSize = useElementSize(boxRef)

  // Panels
  const [panel, setPanel] = useState<Panels>(Panels.None)
  const [view, setView] = useState<CirclesGraphViews>(
    org?.defaultGraphView || CirclesGraphViews.AllCircles
  )
  const [circleId, setCircleId] = useState<string | undefined>()
  const [memberId, setMemberId] = useState<string | null | undefined>()

  // Data
  const circles = useStoreState((state) => state.org.circles)
  const events = useCirclesEvents()

  const handleClosePanel = useCallback(() => navigateOrg('roles'), [])

  // Zoom offsets when focusing
  const focusCropRight =
    useBreakpointValue({
      base: 0,
      lg: panel === Panels.None ? 0 : modalPanelWidth,
    }) || 0
  const focusCropBottom =
    useBreakpointValue({
      base: 0,
      md: panel === Panels.None ? 0 : (boxSize?.height || 0) / 2,
      lg: 0,
    }) || 0
  const focusCrop = useMemo(
    () => ({
      top: 0,
      left: 0,
      right: focusCropRight,
      bottom: focusCropBottom,
    }),
    [focusCropRight, focusCropBottom]
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

  // Use effect to update view when org changes
  useEffect(() => {
    if (org?.defaultGraphView) {
      setView(org.defaultGraphView)
    }
  }, [org])

  return (
    <GraphProvider>
      <Box
        ref={boxRef}
        id="circles-graph"
        position="absolute"
        top={0}
        left={0}
        bottom={0}
        right={0}
        overflow="hidden"
      >
        {org &&
          circles &&
          boxSize &&
          (beta ? (
            <CirclesCanvasGraph
              key={view + colorMode}
              view={view}
              circles={circles}
              events={events}
              width={boxSize.width}
              height={boxSize.height}
              focusCrop={focusCrop}
              selectedCircleId={circleId}
              onReady={() => setReady(true)}
            />
          ) : (
            <CirclesSVGGraph
              key={view + colorMode}
              view={view}
              circles={circles}
              events={events}
              width={boxSize.width}
              height={boxSize.height}
              focusCrop={focusCrop}
              selectedCircleId={circleId}
              onReady={() => setReady(true)}
            />
          ))}
      </Box>

      {panel === Panels.Circle && circleId && (
        <ModalPanel isOpen onClose={handleClosePanel}>
          <CircleProvider circleId={circleId}>
            <CircleContent changeTitle />
          </CircleProvider>
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

      {panel === Panels.None && (
        <Title>{t('CirclesPage.title', { org: org?.name })}</Title>
      )}

      <HStack
        p={2}
        pl={
          sidebarContext?.minimize.isOpen && !sidebarContext?.isMobile ? 12 : 2
        }
      >
        <Box>
          <GraphViewsSelect
            className="userflow-graph-views"
            value={view}
            onChange={setView}
            {...buttonsStyleProps}
          />
        </Box>
        <Box>
          <CirclesSettings
            className="userflow-settings"
            showText
            {...buttonsStyleProps}
          />
        </Box>
        <Button
          size="sm"
          border={0}
          opacity={beta ? 1 : 0}
          _hover={{ opacity: 1 }}
          onClick={() => setBeta((v) => !v)}
        >
          {beta ? 'Disable beta' : 'Try beta'}
        </Button>
      </HStack>
    </GraphProvider>
  )
}
