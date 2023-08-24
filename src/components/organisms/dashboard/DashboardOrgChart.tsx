import { Box, BoxProps, useColorMode } from '@chakra-ui/react'
import useCurrentOrg from '@hooks/useCurrentOrg'
import { useElementSize } from '@hooks/useElementSize'
import useCirclesEvents from '@hooks/useGraphEvents'
import CirclesGraph from '@organisms/circle/CirclesGraph'
import { useStoreState } from '@store/hooks'
import React, { useMemo, useRef } from 'react'
import { GraphViews } from 'src/circles-viz/types'

export default function DashboardOrgChart(boxProps: BoxProps) {
  const org = useCurrentOrg()

  // Content size
  const boxRef = useRef<HTMLDivElement>(null)
  const boxSize = useElementSize(boxRef)
  const size = boxSize?.width // Square

  // Data
  const circles = useStoreState((state) => state.org.circles)
  const { onCircleClick, onMemberClick } = useCirclesEvents()
  const events = useMemo(() => ({ onCircleClick, onMemberClick }), [])

  // Color mode
  const { colorMode } = useColorMode()

  return (
    <Box ref={boxRef} h={size} {...boxProps}>
      {org && circles && size && (
        <CirclesGraph
          key={colorMode}
          view={GraphViews.AllCircles}
          id={`dashboard-graph-${org.id}`}
          circles={circles}
          events={events}
          width={size}
          height={size}
          panzoomDisabled
        />
      )}
    </Box>
  )
}
