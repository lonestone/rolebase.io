import ModalPanel, { modalPanelWidth } from '@atoms/ModalPanel'
import { Title } from '@atoms/Title'
import {
  Box,
  Button,
  ButtonGroup,
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
import CircleContent from '@organisms/circle/CircleContent'
import CirclesGraph from '@organisms/circle/CirclesGraph'
import MemberContent from '@organisms/member/MemberContent'
import Onboarding from '@organisms/onboarding/Onboarding'
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
import { FiCircle, FiDisc } from 'react-icons/fi'
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

export default function CirclesPage() {
  useOverflowHidden()

  const { t } = useTranslation()
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
        top={sidebarContext?.height || 0}
        bottom={0}
        left={0}
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

      <Box
        position="absolute"
        left={sidebarContext?.width}
        top={sidebarContext?.height}
        m={2}
      >
        <ButtonGroup isAttached variant="outline" size="sm">
          <Button
            aria-label=""
            leftIcon={<FiDisc />}
            isActive={view === GraphViews.AllCircles}
            onClick={() => setView(GraphViews.AllCircles)}
          >
            {t('CirclesPage.views.All')}
          </Button>
          <Button
            aria-label=""
            leftIcon={<FiCircle />}
            isActive={view === GraphViews.SimpleCircles}
            onClick={() => setView(GraphViews.SimpleCircles)}
          >
            {t('CirclesPage.views.Simple')}
          </Button>
        </ButtonGroup>
      </Box>

      <CirclesKeyboardShortcuts
        position="absolute"
        left={sidebarContext?.width}
        bottom={0}
        m={2}
      />

      <Onboarding />
    </GraphZoomProvider>
  )
}
