import { Box, useColorMode } from '@chakra-ui/react'
import useCurrentOrg from '@hooks/useCurrentOrg'
import { useElementSize } from '@hooks/useElementSize'
import useCirclesEvents from '@hooks/useGraphEvents'
import CirclesGraph from '@organisms/circle/CirclesGraph'
import { useStoreState } from '@store/hooks'
import React, { useRef } from 'react'
import { GraphViews } from 'src/circles-viz/types'

export default function DashboardOrgChart() {
  const org = useCurrentOrg()

  // Content size
  const boxRef = useRef<HTMLDivElement>(null)
  const boxSize = useElementSize(boxRef)
  const size = boxSize?.width // Square

  // Data
  const circles = useStoreState((state) => state.org.circles)
  const { onCircleClick, onMemberClick } = useCirclesEvents()

  // Color mode
  const { colorMode } = useColorMode()

  return (
    <Box ref={boxRef} w="inherit" h={size}>
      {org && circles && size && (
        <CirclesGraph
          key={colorMode}
          view={GraphViews.AllCircles}
          id={`dashboard-graph-${org.id}`}
          circles={circles}
          events={{ onCircleClick, onMemberClick }}
          width={size}
          height={size}
          panzoomDisabled
        />
      )}
    </Box>
  )
}
