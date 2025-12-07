import { CirclesGraph } from '@/graph/graphs/CirclesGraph'
import { NodeData } from '@/graph/types'
import React from 'react'
import CircleLeadersElement from './CircleLeadersElement'
import NodeElement from './NodeElement'

interface Props {
  graph: CirclesGraph
  node: NodeData
  selected: boolean
}

export default function CircleElement({ graph, node, selected }: Props) {
  const { onCircleClick } = graph.params.events

  return (
    <NodeElement
      graph={graph}
      node={node}
      selected={selected}
      onClick={
        onCircleClick
          ? () => {
              if (!node.data.entityId) return
              // Pass parentId if this is an invited circle (id contains underscore)
              const parentId =
                node.data.id.indexOf('_') !== -1
                  ? node.data.parentId
                  : undefined
              onCircleClick(node.data.entityId, parentId ?? undefined)
            }
          : undefined
      }
    >
      {node.data.participants && <CircleLeadersElement node={node} />}
    </NodeElement>
  )
}
