import { CirclesGraph } from '@/graph/graphs/CirclesGraph'
import { NodeData, NodeType } from '@/graph/types'
import { Text } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'

interface Props {
  graph: CirclesGraph
  node: NodeData
}

const gap = 0.01
const rate = 20
const threshold = 2 / 3

interface Size {
  width: number
  height: number
}

export default function CircleTitleElement({ graph, node }: Props) {
  const parent =
    node.data.type === NodeType.Member ? node.parent?.parent : node.parent

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  // Text size
  const textRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState<Size | undefined>(undefined)
  const sizeRatio = size ? (node.r * 2 * 0.9) / size.width : 1
  const finalWidth = sizeRatio * (size?.width || 0)
  const finalHeight = sizeRatio * (size?.height || 0)

  useEffect(() => {
    setSize(undefined)
  }, [node.r])

  useEffect(() => {
    if (!size && textRef.current) {
      setSize({
        width: textRef.current.offsetWidth,
        height: textRef.current.offsetHeight,
      })
    }
  }, [size])

  return (
    <Text
      ref={textRef}
      position="absolute"
      transform={
        mounted || !parent
          ? `translate(${node.x - finalWidth / 2}px, ${
              node.y - finalHeight / 2
            }px)`
          : `translate(${parent.x}px, ${parent.y}px)`
      }
      transition={
        size
          ? 'transform 300ms ease-out, font-size 300ms ease-out'
          : 'transform 300ms ease-out'
      }
      fontSize={`${sizeRatio * 10}px`}
      fontWeight="bold"
      textAlign="center"
      whiteSpace="nowrap"
      pointerEvents="none"
      opacity={
        size
          ? `clamp(0, min(
        (1 - var(--zoom-scale) - ${gap}) * ${rate},
        1 - (var(--zoom-scale) * ${
          node.r * 2
        } / var(--graph-min-size) - ${threshold} + ${gap}) * ${rate},
        ${
          node.parent && node.parent.data.id !== 'root'
            ? `(var(--zoom-scale) * ${
                node.parent.r * 2
              } / var(--graph-min-size) - ${threshold}) * ${rate}`
            : '1'
        }
      ), 1)`
          : 0
      }
    >
      {node.data.name}
    </Text>
  )
}
