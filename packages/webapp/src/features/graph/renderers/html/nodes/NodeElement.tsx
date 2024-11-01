import { CirclesGraph } from '@/graph/graphs/CirclesGraph'
import useMounted from '@/graph/hooks/useMounted'
import { NodeData, NodeType } from '@/graph/types'
import { BoxProps, Circle } from '@chakra-ui/react'
import React from 'react'
import { useDragNode } from '../hooks/useDragNode'
import { getDarkColor, getLightColor } from '../utils/colors'

interface Props extends BoxProps {
  graph: CirclesGraph
  node: NodeData
  selected?: boolean
  children: React.ReactNode
}

// const defaultSize = 78

export default function NodeElement({
  graph,
  node,
  selected,
  style,
  children,
  ...boxProps
}: Props) {
  const mounted = useMounted()

  const parent =
    node.data.type === NodeType.Member ? node.parent?.parent : node.parent
  const depth = node.depth
  const hue = node.data.colorHue

  // Drag & drop
  const { canDrag, handleMouseDown } = useDragNode(graph, node)

  return (
    <Circle
      id={`node-${node.data.id}`}
      position="absolute"
      style={{
        width: `${node.r * 2}px`,
        height: `${node.r * 2}px`,
        // width: `${defaultSize}px`,
        // height: `${defaultSize}px`,
        transform:
          mounted || !parent
            ? `translate(${node.x - node.r}px, ${node.y - node.r}px) scale(1)`
            : // `translate(${node.x - defaultSize / 2}px, ${
              //   node.y - defaultSize / 2
              // }px) scale(${(node.r * 2) / defaultSize})`
              `translate(${parent.x - node.r}px, ${
                parent.y - node.r
              }px) scale(0)`,
        ...style,
      }}
      transition={`
        transform 1500ms ease-out,
        width 1500ms ease-out,
        height 1500ms ease-out,
        box-shadow 1500ms ease-out,
        opacity 1500ms ease-out
      `}
      display="flex"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      cursor={canDrag ? `var(--node-cursor, pointer)` : 'pointer'}
      bgColor={getLightColor(94, depth, hue)}
      boxShadow={`0 1px 2px ${getLightColor(75, depth, hue)}`}
      outline={`${
        selected ? 'calc(4px / var(--zoom-scale))' : 0
      } solid ${getLightColor(75, depth, hue)}`}
      _dark={{
        bgColor: getDarkColor(16, depth, hue),
        outlineColor: getDarkColor(35, depth, hue),
        boxShadow: `0 1px 2px ${getDarkColor(35, depth, hue)}`,
      }}
      _hover={
        boxProps.onClick && !selected
          ? {
              outlineColor: getLightColor(88, depth, hue),
              outlineWidth: 'calc(4px / var(--zoom-scale))',
              _dark: {
                outlineColor: getDarkColor(22, depth, hue),
              },
            }
          : undefined
      }
      sx={{
        '&.drag-node': {
          boxShadow: `0 10px 10px ${getLightColor(75, depth, hue)}`,
          _dark: {
            boxShadow: `0 10px 10px ${getDarkColor(35, depth, hue)}`,
          },
        },
        '&.dragging': {
          opacity: 0.7,
          zIndex: 1,
          transition: 'box-shadow 1500ms ease-out !important',
        },
        '&.drag-target': {
          outlineWidth: 'calc(8px / var(--zoom-scale))',
        },
      }}
      onMouseDown={handleMouseDown}
      {...boxProps}
    >
      {children}
    </Circle>
  )
}
