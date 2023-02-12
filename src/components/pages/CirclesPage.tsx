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
import { CircleFullFragment } from '@gql'
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

type CirclesPageParams = {
  circleId: string
  memberId: string
}

enum Views {
  All,
  Simple,
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
  const [view, setView] = useState(Views.All)
  const [circleId, setCircleId] = useState<string | undefined>()
  const [memberId, setMemberId] = useState<string | null | undefined>()

  // Data
  const circles = useStoreState((state) => state.org.circles)
  const events = useCirclesEvents()

  // Circles to show according to current view
  const viewCircles = useMemo(() => {
    if (view === Views.All) {
      return circles
    }
    if (view === Views.Simple && circles) {
      return getSimpleViewCircles(circles, circleId)
    }
  }, [view, circleId, circles])

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
        {org && viewCircles && boxSize && (
          <CirclesGraph
            key={view + colorMode}
            id={`graph-${org.id}`}
            circles={viewCircles}
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
            isActive={view === Views.All}
            onClick={() => setView(Views.All)}
          >
            {t('CirclesPage.views.All')}
          </Button>
          <Button
            aria-label=""
            leftIcon={<FiCircle />}
            isActive={view === Views.Simple}
            onClick={() => setView(Views.Simple)}
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

function getSimpleViewCircles(
  circles: CircleFullFragment[],
  circleId: string | undefined
): CircleFullFragment[] {
  // Get selected circle or root circle
  let circle = circles.find((c) =>
    circleId ? c.id === circleId : c.parentId === null
  )
  if (!circle) {
    console.error('Circle not found')
    return []
  }
  const result: CircleFullFragment[] = []

  while (circle) {
    // Add circle children
    result.push(
      ...circles.filter(
        (c) => c.parentId === circle?.id && !result.some((c2) => c2.id === c.id)
      )
    )

    const parent = circles.find((c) => c.id === circle?.parentId)
    // Add root circle
    if (!parent) {
      result.push(circle)
    }
    circle = parent
  }
  return (
    result
      // Remove members (we don't display them on this view)
      .map((c) => ({ ...c, members: [] }))
      // Avoid circles moving places without reason
      .sort((c1, c2) => c1.id.localeCompare(c2.id))
  )
}
