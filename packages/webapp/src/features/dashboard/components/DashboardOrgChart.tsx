import { useElementSize } from '@/common/hooks/useElementSize'
import CirclesHTMLGraph from '@/graph/CirclesHTMLGraph'
import useCirclesEvents from '@/graph/hooks/useGraphEvents'
import { CirclesGraphViews } from '@/graph/types'
import useCurrentOrg from '@/org/hooks/useCurrentOrg'
import { Box, BoxProps, useColorMode } from '@chakra-ui/react'
import { useStoreState } from '@store/hooks'
import React, { useMemo, useRef } from 'react'

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
        <CirclesHTMLGraph
          key={colorMode}
          view={CirclesGraphViews.AllCircles}
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
