import { CirclesGraph } from '@/graph/graphs/CirclesGraph'
import { NodeData } from '@/graph/types'
import { SystemStyleObject } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import NodeElement, { nodeSize } from './NodeElement'

interface Props {
  graph: CirclesGraph
  node: NodeData
}

export default function MemberElement({ graph, node }: Props) {
  // Click
  const { onMemberClick } = graph.params.events
  const handleClick = onMemberClick
    ? () =>
        node.data.parentId &&
        node.data.entityId &&
        onMemberClick?.(node.data.parentId, node.data.entityId)
    : undefined

  // Name
  const firstname = useMemo(
    () => node.data.name.replace(/ .*$/, ''),
    [node.data.name]
  )

  return (
    <NodeElement
      graph={graph}
      node={node}
      className="member"
      style={{ backgroundImage: `url(${node.data.picture})` }}
      onClick={handleClick}
    >
      <span
        className="member-name"
        style={{
          translate: `0px ${nodeSize / 2 - 35}px`,
        }}
      >
        {firstname}
      </span>
    </NodeElement>
  )
}

export const memberStyles: SystemStyleObject = {
  '.member': {
    display: 'var(--display-members, flex)',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundOrigin: 'border-box',
  },
  '.member-name': {
    color: 'white',
    textShadow:
      '-1px -1px 0 rgba(0, 0, 0, 0.3), 1px -1px 0 rgba(0, 0, 0, 0.3), -1px 1px 0 rgba(0, 0, 0, 0.3), 1px 1px 0 rgba(0, 0, 0, 0.3)',
    fontSize: `${nodeSize / 6}px`,
  },
  '.member-name:hover': {
    display: 'block !important',
  },
}
