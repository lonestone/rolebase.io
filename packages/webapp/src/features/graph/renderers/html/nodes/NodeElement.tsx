import { CirclesGraph } from '@/graph/graphs/CirclesGraph'
import useMounted from '@/graph/hooks/useMounted'
import settings from '@/graph/settings'
import { NodeData, NodeType } from '@/graph/types'
import { SystemStyleObject, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { useDragNode } from '../hooks/useDragNode'
import { getColor } from '../utils/colors'

interface Props extends React.HTMLProps<HTMLDivElement> {
  graph: CirclesGraph
  node: NodeData
  selected?: boolean
  children: React.ReactNode
}

// Size of node before scaling
// Should be high enough to be divided for border width (in Panzoom)
// Should be low enough to not glitch when scaling
export const nodeSize = 200

export default function NodeElement({
  graph,
  node,
  selected,
  style,
  className,
  children,
  ...divProps
}: Props) {
  const mounted = useMounted()
  const { colorMode } = useColorMode()

  const parent =
    node.data.type === NodeType.Member ? node.parent?.parent : node.parent

  const depth = node.depth
  const hue = node.data.colorHue

  // Drag & drop
  const { canDrag, handleMouseDown } = useDragNode(graph, node)

  const bgColor = getColor(colorMode, 94, 16, depth, hue)
  const outlineColor = getColor(colorMode, 75, 35, depth, hue)
  const boxShadowColor = getColor(colorMode, 75, 35, depth, hue)
  const hoverOutlineColor = getColor(colorMode, 88, 22, depth, hue)

  return (
    <div
      id={`node-${node.data.id}`}
      className={`node ${className || ''} ${
        divProps.onClick && !selected ? 'clickable' : ''
      } ${selected ? 'selected' : ''}`}
      style={
        {
          width: `${nodeSize}px`,
          height: `${nodeSize}px`,
          marginLeft: `-${nodeSize / 2}px`,
          marginTop: `-${nodeSize / 2}px`,
          translate:
            mounted || !parent
              ? `${node.x}px ${node.y}px`
              : `${parent.x}px ${parent.y}px`,
          scale: mounted || !parent ? 'var(--node-scale)' : '0',
          cursor: canDrag ? `var(--node-cursor, pointer)` : 'pointer',
          '--node-scale': `${(node.r * 2) / nodeSize}`,
          '--bg-color': bgColor,
          '--outline-color': outlineColor,
          '--hover-outline-color': hoverOutlineColor,
          '--box-shadow-color': boxShadowColor,
          ...style,
        } as React.CSSProperties
      }
      onMouseDown={handleMouseDown}
      {...divProps}
    >
      {children}
    </div>
  )
}

export const nodeStyles: SystemStyleObject = {
  '.node': {
    position: 'absolute',
    transition: `
      translate ${settings.move.duration}ms ease-out,
      scale ${settings.move.duration}ms ease-out,
      box-shadow ${settings.move.duration}ms ease-out,
      opacity ${settings.move.duration}ms ease-out
    `,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: '50%',
    backgroundColor: 'var(--bg-color)',
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: 'var(--outline-color)',
  },
  '.node.selected': {
    borderWidth: 'calc(4px / var(--zoom-scale) / var(--node-scale))',
  },
  '.node.clickable:hover': {
    borderColor: 'var(--hover-outline-color)',
    borderWidth: 'calc(4px / var(--zoom-scale) / var(--node-scale))',
  },
  '.node.drag-node': {
    boxShadow: `0 10px 10px var(--box-shadow-color)`,
  },
  '.node.dragging': {
    opacity: 0.7,
    zIndex: 1,
    // Reset transition while dragging to avoid lagging behind the mouse
    transition: `box-shadow ${settings.move.duration}ms ease-out !important`,
  },
  '.node.drag-target': {
    borderWidth: 'calc(8px / var(--zoom-scale) / var(--node-scale))',
  },
}
