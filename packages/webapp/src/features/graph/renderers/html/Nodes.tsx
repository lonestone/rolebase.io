import { NodeType } from '@/graph/types'
import React, { memo } from 'react'
import { CirclesGraph } from '../../graphs/CirclesGraph'
import { useGraphNodes } from './hooks/useGraphNodes'
import { useGraphSelectedCircleId } from './hooks/useGraphSelectedCircleId'
import CircleElement from './nodes/CircleElement'
import MemberElement from './nodes/MemberElement'

interface Props {
  graph: CirclesGraph
}

export default memo(function Nodes({ graph }: Props) {
  const nodes = useGraphNodes(graph)
  const selectedCircleId = useGraphSelectedCircleId(graph)

  return nodes.map((node) => {
    const selected = selectedCircleId === node.data.id
    return node.data.type === NodeType.Circle ? (
      <CircleElement
        key={node.data.id}
        graph={graph}
        node={node}
        selected={selected}
      />
    ) : node.data.type === NodeType.Member ? (
      <MemberElement key={node.data.id} graph={graph} node={node} />
    ) : null
  })
})
