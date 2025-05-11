import { Box, SystemStyleObject } from '@chakra-ui/react'
import React from 'react'
import { CirclesGraph } from '../../graphs/CirclesGraph'
import { useGraphZoom } from './hooks/useGraphZoom'
import { circleLeadersStyles } from './nodes/CircleLeadersElement'
import { circleTitleStyles } from './nodes/CircleTitleElement'
import { memberStyles } from './nodes/MemberElement'
import { nodeStyles } from './nodes/NodeElement'

interface Props {
  graph: CirclesGraph
  children: React.ReactNode
}

const styles: SystemStyleObject = {
  ...nodeStyles,
  ...circleTitleStyles,
  ...circleLeadersStyles,
  ...memberStyles,
}

export function Panzoom({ graph, children }: Props) {
  const transform = useGraphZoom(graph)

  return (
    <Box
      position="relative"
      transformOrigin="top left"
      userSelect="none"
      style={
        {
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.k})`,
          '--zoom-scale': transform.k.toString(),
          '--display-members': transform.k > 1 ? undefined : 'none',
        } as React.CSSProperties
      }
      sx={styles}
    >
      {children}
    </Box>
  )
}
