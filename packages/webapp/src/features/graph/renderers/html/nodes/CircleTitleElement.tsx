import useMounted from '@/graph/hooks/useMounted'
import { NodeData, NodeType } from '@/graph/types'
import { Flex, Text } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'

interface Props {
  node: NodeData
}

const gap = 0.01
const rate = 20
const threshold = 2 / 3

interface Size {
  width: number
  height: number
}

export default function CircleTitleElement({ node }: Props) {
  const mounted = useMounted()
  const parent =
    node.data.type === NodeType.Member ? node.parent?.parent : node.parent

  // Text size
  const textRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState<Size | undefined>(undefined)
  const sizeRatio = size ? (node.r * 2 * 0.9) / size.width : 1

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
    <Flex
      position="absolute"
      width={mounted ? `${node.r * 2}px` : '0px'}
      height={mounted ? `${node.r * 2}px` : '0px'}
      transform={
        mounted || !parent
          ? `translate(${node.x - node.r}px, ${node.y - node.r}px)`
          : `translate(${parent.x}px, ${parent.y}px)`
      }
      transition={`
        transform 1500ms ease-out,
        width 1500ms ease-out,
        height 1500ms ease-out
      `}
      justifyContent="center"
      alignItems="center"
      pointerEvents="none"
    >
      <Text
        ref={textRef}
        transition={size ? 'font-size 1500ms ease-out' : undefined}
        fontSize={`${sizeRatio * 10}px`}
        fontWeight="bold"
        textAlign="center"
        whiteSpace="nowrap"
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
    </Flex>
  )
}
