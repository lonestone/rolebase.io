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

const topThreshold = 2 / 3
const topRate = 20

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
      id={`circle-title-${node.data.id}`}
      position="absolute"
      width={mounted ? `${node.r * 2}px` : '0px'}
      height={mounted ? `${node.r * 2}px` : '0px'}
      style={{
        transform:
          mounted || !parent
            ? `translate(${node.x - node.r}px, ${node.y - node.r}px)`
            : `translate(${parent.x}px, ${parent.y}px)`,
      }}
      transition={`
        transform 300ms ease-out,
        width 300ms ease-out,
        height 300ms ease-out
      `}
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      pointerEvents="none"
      sx={{
        '&.dragging': {
          opacity: 0.7,
          zIndex: 1,
          transition: 'none !important',
        },
      }}
    >
      <Text
        ref={textRef}
        transition={size ? 'font-size 300ms ease-out' : undefined}
        fontSize={`${sizeRatio * 10}px`}
        fontWeight="bold"
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

      <Text
        position="absolute"
        bottom={`${node.r * 2 - 10}px`}
        transition="bottom 300ms ease-out"
        maxH="2em"
        minW="100px"
        overflow="hidden"
        textOverflow="ellipsis"
        opacity={`max(
            (var(--zoom-scale) - 1) * ${topRate} + 1,
            (var(--zoom-scale) * (${
              node.r * 2
            } / var(--graph-min-size)) - ${topThreshold}) * ${topRate}
          )`}
        fontSize={`calc(${
          10 + Math.min(node.r / 1000, 1) * 10
        }px / var(--zoom-scale) + var(--zoom-scale) * 1px)`}
        fontWeight="bold"
        lineHeight="1em"
        sx={{ textWrap: 'balance' }}
        pointerEvents="none"
      >
        {node.data.name}
      </Text>
    </Flex>
  )
}
