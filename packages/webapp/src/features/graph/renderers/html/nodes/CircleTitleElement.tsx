import useMounted from '@/graph/hooks/useMounted'
import settings from '@/graph/settings'
import { NodeData, NodeType } from '@/graph/types'
import { SystemStyleObject } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'

interface Props {
  node: NodeData
}

const baseSize = 500
const gap = 0.01
const rate = 100
const threshold = 2 / 3
const centerCoverage = 0.9
const topThreshold = 2 / 3

export default function CircleTitleElement({ node }: Props) {
  const mounted = useMounted()
  const parent =
    node.data.type === NodeType.Member ? node.parent?.parent : node.parent

  const baseSizeRatio = (node.r * 2) / baseSize

  // Cover title size
  const centerRef = useRef<HTMLDivElement>(null)
  const [centerSizeRatio, setCenterSizeRatio] = useState<number>(0)

  useEffect(() => {
    if (!centerRef.current) return
    setCenterSizeRatio(
      (baseSize * centerCoverage) / centerRef.current.offsetWidth
    )
  }, [node.r])

  return (
    <div
      id={`circle-title-${node.data.id}`}
      className="circle-title"
      style={{
        width: `${baseSize}px`,
        height: `${baseSize}px`,
        marginLeft: `-${baseSize / 2}px`,
        marginTop: `-${baseSize / 2}px`,
        translate:
          mounted || !parent
            ? `${node.x}px ${node.y}px`
            : `${parent.x}px ${parent.y}px`,
        scale: mounted ? baseSizeRatio.toString() : '0',
      }}
    >
      <div
        ref={centerRef}
        className="circle-title-center"
        style={{
          transform: `scale(${centerSizeRatio})`,
          // Opacity based on:
          // - Zoom scale below 1
          // - Displayed circle size above threshold
          // - Displayed circle size below min size (parent)
          opacity: `min(
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
          )`,
        }}
      >
        {node.data.name}
      </div>
      <div
        className="circle-title-top"
        style={{
          bottom: `${baseSize}px`,
          translate: `0px ${10 / baseSizeRatio}px`,
          // Scale based on:
          // - Light upscale depending on circle size
          // - Light upscale depending on zoom scale
          // - Rescaling with zoom scale and baseSizeRatio
          scale: `calc(
            ${0.2 * (1 + baseSizeRatio / 10)}
            * (1 + var(--zoom-scale) / 2)
            / var(--zoom-scale) / ${baseSizeRatio}
          )`,
          opacity: `max(
            (var(--zoom-scale) - 1) * ${rate} + 1,
            (var(--zoom-scale) * (${
              node.r * 2
            } / var(--graph-min-size)) - ${topThreshold}) * ${rate}
          )`,
        }}
      >
        {node.data.name}
      </div>
    </div>
  )
}

export const circleTitleStyles: SystemStyleObject = {
  '.circle-title': {
    position: 'absolute',
    transition: `
      translate ${settings.move.duration}ms ease-out,
      scale ${settings.move.duration}ms ease-out
    `,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    pointerEvents: 'none',
  },
  '.circle-title.dragging': {
    opacity: 0.7,
    zIndex: 1,
    transition: 'none !important',
  },
  '.circle-title-center': {
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    fontSize: '100px',
  },
  '.circle-title-top': {
    position: 'absolute',
    transformOrigin: 'bottom center',
    // Acceptable font size for a one-member role at zoom-scale 3 and scale 1
    fontSize: '36px',
    maxHeight: '2em',
    minWidth: '130%',
    wordWrap: 'normal',
    fontWeight: 'bold',
    lineHeight: '1em',
  },
}
