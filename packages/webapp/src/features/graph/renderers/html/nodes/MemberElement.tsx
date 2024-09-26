import { CirclesGraph } from '@/graph/graphs/CirclesGraph'
import { NodeData } from '@/graph/types'
import { Text } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import NodeElement from './NodeElement'

interface Props {
  graph: CirclesGraph
  node: NodeData
  selected: boolean
}

export default function MemberElement({ graph, node, selected }: Props) {
  const { onMemberClick } = graph.params.events

  const hideFirstname = !!node.data.picture
  const firstname = useMemo(
    () => node.data.name.replace(/ .*$/, ''),
    [node.data.name]
  )

  return (
    <NodeElement
      node={node}
      role="group"
      display="var(--display-members, flex)"
      bgImg={`url(${node.data.picture})`}
      bgPos="center"
      bgSize="cover"
      onClick={() =>
        node.data.parentId &&
        node.data.entityId &&
        onMemberClick?.(node.data.parentId, node.data.entityId)
      }
    >
      <Text
        color="white"
        fontSize="10px"
        textAlign="center"
        display={hideFirstname ? 'none' : 'block'}
        _groupHover={{ display: 'block' }}
      >
        {firstname}
      </Text>
    </NodeElement>
  )
}
