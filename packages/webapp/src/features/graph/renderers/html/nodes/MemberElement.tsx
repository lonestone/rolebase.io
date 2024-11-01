import { CirclesGraph } from '@/graph/graphs/CirclesGraph'
import { NodeData } from '@/graph/types'
import { Text } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import NodeElement from './NodeElement'

interface Props {
  graph: CirclesGraph
  node: NodeData
}

export default function MemberElement({ graph, node }: Props) {
  const { onMemberClick } = graph.params.events

  const hideFirstname = !!node.data.picture
  const firstname = useMemo(
    () => node.data.name.replace(/ .*$/, ''),
    [node.data.name]
  )

  return (
    <NodeElement
      graph={graph}
      node={node}
      role="group"
      display="var(--display-members, flex)"
      style={{
        backgroundImage: `url(${node.data.picture})`,
      }}
      bgPos="center"
      bgSize="cover"
      onClick={
        onMemberClick
          ? () =>
              node.data.parentId &&
              node.data.entityId &&
              onMemberClick?.(node.data.parentId, node.data.entityId)
          : undefined
      }
    >
      <Text
        color="white"
        fontSize="10px"
        display={hideFirstname ? 'none' : 'block'}
        _groupHover={{ display: 'block' }}
      >
        {firstname}
      </Text>
    </NodeElement>
  )
}
