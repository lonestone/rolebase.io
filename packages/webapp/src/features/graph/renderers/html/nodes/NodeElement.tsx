import { NodeData, NodeType } from '@/graph/types'
import { BoxProps, Circle } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { getDarkColor, getLightColor } from '../colors'

interface Props extends BoxProps {
  node: NodeData
  selected?: boolean
  children: React.ReactNode
}

export default function NodeElement({
  node,
  selected,
  children,
  ...boxProps
}: Props) {
  const parent =
    node.data.type === NodeType.Member ? node.parent?.parent : node.parent
  const depth = node.depth
  const hue = node.data.colorHue

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Circle
      className="circle"
      position="absolute"
      size={mounted ? `${node.r * 2}px` : '0px'}
      transform={
        mounted || !parent
          ? `translate(${node.x - node.r}px, ${node.y - node.r}px)`
          : `translate(${parent.x}px, ${parent.y}px)`
      }
      transition="transform 300ms ease-out, width 300ms ease-out, height 300ms ease-out"
      cursor="pointer"
      bgColor={getLightColor(94, depth, hue)}
      outline={`${
        selected ? 'calc(4px / var(--zoom-scale))' : 0
      } solid ${getLightColor(75, depth, hue)}`}
      _dark={{
        bg: getDarkColor(16, depth, hue),
        outlineColor: getDarkColor(35, depth, hue),
      }}
      _hover={
        !selected
          ? {
              outlineColor: getLightColor(88, depth, hue),
              outlineWidth: 'calc(4px / var(--zoom-scale))',
              _dark: {
                outlineColor: getDarkColor(22, depth, hue),
              },
            }
          : undefined
      }
      ondrg
      {...boxProps}
    >
      {children}
    </Circle>
  )
}
