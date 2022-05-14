import { useColorMode } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { useOrgId } from '@hooks/useOrgId'
import { useStoreState } from '@store/hooks'
import React, { useEffect, useRef, useState } from 'react'
import { circleColor } from 'src/theme'
import { ColorModeProps, mode } from 'src/utils'
import { createGraph, Graph } from '../../circles-viz/createGraph'
import useCirclesEvents from '../../hooks/useGraphEvents'

interface Props {
  width: number
  height: number
  selectedCircleId?: string
  onReady?(): void
}

const StyledSVG = styled.svg<ColorModeProps>`
  position: absolute;
  font-family: var(--chakra-fonts-circles);
  font-size: 8px;
  font-weight: 600;
  fill: ${mode('#1a202c', 'rgba(255, 255, 255, 0.92)')};

  [data-hover] circle {
    stroke: ${(p) =>
      circleColor(
        mode(
          `calc(88% - (var(--depth) - 1) * 7%)`,
          `calc(22% + (var(--depth) - 1) * 7%)`
        )(p),
        'var(--hue)'
      )};
    stroke-width: 2px;
  }
  [data-selected] circle {
    stroke: ${(p) =>
      circleColor(
        mode(
          `calc(75% - (var(--depth) - 1) * 7%)`,
          `calc(35% + (var(--depth) - 1) * 7%)`
        )(p),
        'var(--hue)'
      )};
    stroke-width: 2px;
  }
  [data-dragging] circle {
    filter: url(#${({ id }) => id}-shadow);
    fill-opacity: 0.5;
  }
  [data-drag-target] circle {
    stroke: ${(p) => circleColor(mode('20%', '80%')(p))};
    stroke-width: 3px;
  }
`

export default function CirclesGraph({
  width,
  height,
  selectedCircleId,
  onReady,
}: Props) {
  // Utils
  const { colorMode } = useColorMode()

  // Data
  const orgId = useOrgId()
  const circles = useStoreState((state) => state.circles.entries)
  const members = useStoreState((state) => state.members.entries)
  const roles = useStoreState((state) => state.roles.entries)

  // Viz
  const svgRef = useRef<SVGSVGElement>(null)
  const graphRef = useRef<Graph>()
  const [ready, setReady] = useState(false)

  // Events
  const events = useCirclesEvents()

  // Display viz
  useEffect(() => {
    if (
      !svgRef.current ||
      width === 0 ||
      height === 0 ||
      !members ||
      !roles ||
      !circles
    ) {
      return
    }
    // Init Graph
    if (!graphRef.current) {
      const graph = createGraph(svgRef.current, { width, height, events })

      // Change ready state after first draw
      graph.addDrawListener(() => setReady(true), true)
      graphRef.current = graph
    }

    // (Re)-draw graph
    graphRef.current.update({
      width,
      height,
      selectedCircleId,
      circles,
      roles,
      members,
    })
  }, [
    members,
    roles,
    circles,
    width,
    height,
    selectedCircleId,
    ...Object.values(events),
  ])

  // Remove SVG listeners on unmount
  useEffect(() => () => graphRef.current?.removeListeners(), [])

  // Focus on a circle when focusCircleId is defined
  useEffect(() => {
    if (ready && selectedCircleId) {
      // Let the panel show, then focus on circle
      setTimeout(() => {
        graphRef.current?.zoom.focusCircle?.(selectedCircleId, true)
      }, 100)
    }
  }, [ready, selectedCircleId])

  // Call prop onReady when ready
  useEffect(() => {
    if (ready) {
      onReady?.()
    }
  }, [ready])

  return (
    <StyledSVG
      ref={svgRef}
      id={`graph-${orgId}`}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      textAnchor="middle"
      colorMode={colorMode}
    />
  )
}
