import {
  addMemberToCircle,
  copyCircle,
  moveCircle,
  moveCircleMember,
} from '@api/entities/circles'
import styled from '@emotion/styled'
import { useNavigateOrg } from '@hooks/useNavigateOrg'
import { useStoreState } from '@store/hooks'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { createGraph, Graph } from '../../circles-viz/createGraph'

interface Props {
  width: number
  height: number
  selectedCircleId?: string
  onReady?(): void
}

const StyledSVG = styled.svg`
  position: absolute;
  font: 10px sans-serif;
  fill: #1a202c;

  [data-hover] circle {
    stroke: hsl(170deg 50% calc(88% - (var(--depth) - 1) * 7%));
    stroke-width: 2px;
  }
  [data-selected] circle {
    stroke: hsl(170deg 50% calc(75% - (var(--depth) - 1) * 7%));
    stroke-width: 2px;
  }
  [data-dragging] circle {
    filter: url(#${({ id }) => id}-shadow);
    fill-opacity: 0.5;
  }
  [data-drag-target] circle {
    stroke: hsl(170deg 50% 20%);
    stroke-width: 3px;
  }
`

export default function CirclesGraph({
  width,
  height,
  selectedCircleId,
  onReady,
}: Props) {
  // Navigation
  const navigateOrg = useNavigateOrg()

  // Data
  const orgId = useStoreState((state) => state.orgs.currentId)
  const circles = useStoreState((state) => state.circles.entries)
  const members = useStoreState((state) => state.members.entries)
  const roles = useStoreState((state) => state.roles.entries)

  // Viz
  const svgRef = useRef<SVGSVGElement>(null)
  const graphRef = useRef<Graph>()
  const [ready, setReady] = useState(false)

  const onMemberClick = useCallback(
    (memberId: string) => navigateOrg(`?memberId=${memberId}`),
    []
  )
  const onCircleClick = useCallback(
    (circleId: string) => navigateOrg(`?circleId=${circleId}`),
    []
  )
  const onCircleMemberClick = useCallback(
    (circleId: string, memberId: string) =>
      navigateOrg(`?circleId=${circleId}&memberId=${memberId}`),
    []
  )

  // Display viz
  useEffect(() => {
    if (
      svgRef.current &&
      width !== 0 &&
      height !== 0 &&
      members &&
      roles &&
      circles
    ) {
      // Init Graph
      if (!graphRef.current) {
        const graph = createGraph(svgRef.current, {
          width,
          height,
          events: {
            onCircleClick,
            onCircleMove: moveCircle,
            onCircleCopy: copyCircle,
            onCircleMemberClick,
            onMemberClick,
            onMemberMove: moveCircleMember,
            onMemberAdd: addMemberToCircle,
            onClickOutside: navigateOrg,
          },
        })

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
    }
  }, [
    members,
    roles,
    circles,
    width,
    height,
    selectedCircleId,
    onCircleClick,
    onMemberClick,
    onCircleMemberClick,
  ])

  // Remove SVG listeners on unmount
  useEffect(() => () => graphRef.current?.removeListeners(), [])

  // Focus on a circle when focusCircleId is defined
  useEffect(() => {
    if (ready && selectedCircleId) {
      graphRef.current?.zoom.focusCircle?.(selectedCircleId, true)
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
    ></StyledSVG>
  )
}
