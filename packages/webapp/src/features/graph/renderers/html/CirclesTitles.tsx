import { NodeType } from '@/graph/types'
import React, { memo } from 'react'
import { CirclesGraph } from '../../graphs/CirclesGraph'
import { useGraphNodes } from './hooks/useGraphNodes'
import CircleTitleElement from './nodes/CircleTitleElement'

interface Props {
  graph: CirclesGraph
}

export default memo(function CirclesTitles({ graph }: Props) {
  const nodes = useGraphNodes(graph)

  return nodes.map((node) =>
    node.data.type === NodeType.Circle ? (
      <CircleTitleElement key={node.data.id} node={node} />
    ) : null
  )
})
