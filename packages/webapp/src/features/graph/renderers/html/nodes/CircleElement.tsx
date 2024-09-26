import { CirclesGraph } from '@/graph/graphs/CirclesGraph'
import { NodeData } from '@/graph/types'
import { Text } from '@chakra-ui/react'
import React from 'react'
import CircleLeadersElement from './CircleLeadersElement'
import NodeElement from './NodeElement'

interface Props {
  graph: CirclesGraph
  node: NodeData
  selected: boolean
}

const titleThreshold = 2 / 3
const titleRate = 20

export default function CircleElement({ graph, node, selected }: Props) {
  const { onCircleClick } = graph.params.events

  return (
    <NodeElement
      node={node}
      selected={selected}
      textAlign="center"
      onClick={() => node.data.entityId && onCircleClick?.(node.data.entityId)}
    >
      <Text
        maxH="2em"
        minW="100px"
        overflow="hidden"
        textOverflow="ellipsis"
        opacity={`max(
            (var(--zoom-scale) - 1) * ${titleRate} + 1,
            (var(--zoom-scale) * (${
              node.r * 2
            } / var(--graph-min-size)) - ${titleThreshold}) * ${titleRate}
          )`}
        fontSize={`calc(${
          10 + Math.min(node.r / 1000, 1) * 10
        }px / var(--zoom-scale) + var(--zoom-scale) * 1px)`}
        fontWeight="bold"
        lineHeight="1em"
        sx={{ textWrap: 'balance' }}
        position="absolute"
        bottom={`${node.r * 2 - 10}px`}
        pointerEvents="none"
      >
        {node.data.name}
      </Text>
      <CircleLeadersElement node={node} />
    </NodeElement>
  )
}
