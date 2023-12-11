import ModalPanel, { modalPanelWidth } from '@atoms/ModalPanel'
import { Title } from '@atoms/Title'
import { Box, HStack, useBreakpointValue, useColorMode } from '@chakra-ui/react'
import { CircleProvider } from '@contexts/CIrcleContext'
import { GraphProvider } from '@contexts/GraphContext'
import useCurrentOrg from '@hooks/useCurrentOrg'
import { useElementSize } from '@hooks/useElementSize'
import useCirclesEvents from '@hooks/useGraphEvents'
import { useNavigateOrg } from '@hooks/useNavigateOrg'
import useOverflowHidden from '@hooks/useOverflowHidden'
import useQueryParams from '@hooks/useQueryParams'
import CircleContent from '@molecules/circle/CircleContent'
import CirclesSettings from '@molecules/circle/CirclesSettings'
import GraphViewsSelect from '@molecules/circle/GraphViewsSelect'
import CirclesGraph from '@organisms/circle/CirclesGraph'
import MemberContent from '@organisms/member/MemberContent'
import { useStoreState } from '@store/hooks'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
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

const buttonsStyleProps = {
  variant: 'outline',
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

  const queryParams = useQueryParams<CirclesPageParams>()
  const navigateOrg = useNavigateOrg()
  const org = useCurrentOrg()
  const [ready, setReady] = useState(false)

  // Content size
  const boxRef = useRef<HTMLDivElement>(null)
  const boxSize = useElementSize(boxRef)

  // Panels
  const [panel, setPanel] = useState<Panels>(Panels.None)
  const [view, setView] = useState(GraphViews.AllCircles)
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

  return (
    <GraphProvider>
      <Box
        ref={boxRef}
        position="absolute"
        top={0}
        left={0}
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

      <HStack p={2}>
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
            size="sm"
            border={0}
            {...buttonsStyleProps}
          />
        </Box>
      </HStack>
    </GraphProvider>
  )
}
