import { Box } from '@chakra-ui/react'
import React from 'react'
import { CirclesGraph } from '../../graphs/CirclesGraph'
import { useGraphZoom } from './hooks/useGraphZoom'

interface Props {
  graph: CirclesGraph
  children: React.ReactNode
}

export function Panzoom({ graph, children }: Props) {
  const transform = useGraphZoom(graph)

  return (
    <Box
      position="relative"
      transformOrigin="top left"
      style={
        {
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.k})`,
          '--zoom-scale': transform.k.toString(),
          '--display-members': transform.k > 1 ? undefined : 'none',
          '--display-titles': transform.k > 1 ? 'none' : undefined,
        } as React.CSSProperties
      }
    >
      {children}
    </Box>
  )
}
