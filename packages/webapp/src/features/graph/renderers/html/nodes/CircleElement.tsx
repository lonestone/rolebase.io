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
      graph={graph}
      node={node}
      selected={selected}
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
        transition="bottom 1500ms ease-out"
        pointerEvents="none"
      >
        {node.data.name}
      </Text>

      {node.data.participants && <CircleLeadersElement node={node} />}
    </NodeElement>
  )
}
