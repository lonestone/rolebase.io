import useMounted from '@/graph/hooks/useMounted'
import { NodeData, NodeType } from '@/graph/types'
import { Flex, Text } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'

interface Props {
  node: NodeData
}

const baseSize = 1000

const gap = 0.01
const rate = 20
const threshold = 2 / 3

const topThreshold = 2 / 3
const topRate = 20

export default function CircleTitleElement({ node }: Props) {
  const mounted = useMounted()
  const parent =
    node.data.type === NodeType.Member ? node.parent?.parent : node.parent

  const baseSizeRatio = (node.r * 2) / baseSize

  // Cover title size
  const textRef = useRef<HTMLDivElement>(null)
  const [sizeRatio, setSizeRatio] = useState<number>(0)

  useEffect(() => {
    if (!textRef.current) return
    //setSizeRatio((node.r * 2 * 0.9) / textRef.current.offsetWidth)
    setSizeRatio((baseSize * 0.9) / textRef.current.offsetWidth)
  }, [node.r])

  return (
    <Flex
      id={`circle-title-${node.data.id}`}
      position="absolute"
      width={mounted ? `${baseSize}px` : '0px'}
      height={mounted ? `${baseSize}px` : '0px'}
      transition="transform 1500ms ease-out"
      style={{
        // width: mounted ? `${node.r * 2}px` : '0px',
        // height: mounted ? `${node.r * 2}px` : '0px',
        transform:
          mounted || !parent
            ? // `translate(${node.x - node.r}px, ${node.y - node.r}px)`
              `translate(${node.x - baseSize / 2}px, ${
                node.y - baseSize / 2
              }px) scale(${baseSizeRatio})`
            : `translate(${parent.x}px, ${parent.y}px) scale(0)`,
      }}
      // width 1500ms ease-out,
      // height 1500ms ease-out
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
        // Cover title
        ref={textRef}
        fontWeight="bold"
        whiteSpace="nowrap"
        fontSize="100px"
        transition="transform 1500ms ease-out"
        style={{
          transform: `scale(${sizeRatio})`,
          opacity: sizeRatio
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
            : 0,
        }}
      >
        {node.data.name}
      </Text>

      <Text
        // Top title
        position="absolute"
        bottom={0}
        transformOrigin="bottom center"
        fontSize="100px"
        style={{
          transform: mounted
            ? `translateY(${10 / baseSizeRatio - baseSize}px) scale(calc(${
                (1 + Math.min(node.r / 1000, 1)) / baseSizeRatio / 8
              } / var(--zoom-scale) + var(--zoom-scale) / ${
                100 * baseSizeRatio
              }))`
            : 'translateY(0px) scale(0)',
          opacity: `max(
            (var(--zoom-scale) - 1) * ${topRate} + 1,
            (var(--zoom-scale) * (${
              node.r * 2
            } / var(--graph-min-size)) - ${topThreshold}) * ${topRate}
          )`,
          // fontSize: `calc(${
          //   10 + Math.min(node.r / 1000, 1) * 10
          // }px / var(--zoom-scale) + var(--zoom-scale) * 1px)`,
        }}
        maxH="2em"
        minW="100px"
        overflow="hidden"
        textOverflow="ellipsis"
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
