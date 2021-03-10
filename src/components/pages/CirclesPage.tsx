import { Box, useDisclosure } from '@chakra-ui/react'
import styled from '@emotion/styled'
import useComponentSize from '@rehooks/component-size'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  addMemberToCircle,
  copyCircle,
  moveCircle,
  moveCircleMember,
} from '../../api/entities/circles'
import { createGraph, Graph } from '../../circles-viz/createGraph'
import CircleCreateModal from '../circles/CircleCreateModal'
import CirclePanel from '../circles/CirclePanel'
import MemberPanel from '../members/MemberPanel'
import { useStoreState } from '../store/hooks'

enum Panels {
  Circle,
  Member,
}

const StyledSVG = styled.svg`
  position: absolute;
  font: 10px sans-serif;
`

export default function CirclesPage() {
  // Data
  const orgId = useStoreState((state) => state.orgs.currentId)
  const circles = useStoreState((state) => state.circles.entries)
  const members = useStoreState((state) => state.members.entries)
  const roles = useStoreState((state) => state.roles.entries)

  // Viz
  const boxRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const graphRef = useRef<Graph>()
  const { width, height } = useComponentSize(boxRef)

  // Add circle modal
  const {
    isOpen: isCreateCircleOpen,
    onOpen: onCreateCircleOpen,
    onClose: onCreateCircleClose,
  } = useDisclosure()

  // Panels
  const [panel, setPanel] = useState<Panels | undefined>()
  const [circleId, setCircleId] = useState<string | null | undefined>()
  const [memberId, setMemberId] = useState<string | null | undefined>()

  // Click on a circle
  const onCircleClick = useCallback((circleId: string) => {
    setCircleId(circleId)
    setPanel(Panels.Circle)
  }, [])

  // Click on a member in a circle
  const onCircleMemberClick = useCallback(
    (circleId: string, memberId: string) => {
      setCircleId(circleId)
      setMemberId(memberId)
      setPanel(Panels.Member)
    },
    []
  )

  // Click on a member in add menu
  const onMemberClick = useCallback((memberId: string) => {
    setCircleId(undefined)
    setMemberId(memberId)
    setPanel(Panels.Member)
  }, [])

  // Add circle
  const onCircleAdd = useCallback(
    (targetCircleId: string | null) => {
      setCircleId(targetCircleId)
      onCreateCircleOpen()
    },
    [onCreateCircleOpen]
  )

  // Focus on a circle
  const onCircleFocus = useCallback((circleId: string) => {
    setCircleId(circleId)
    graphRef.current?.zoom.focusCircle?.(circleId, true)
  }, [])

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
        graphRef.current = createGraph(svgRef.current, {
          width,
          height,
          events: {
            onCircleClick,
            onCircleMove: moveCircle,
            onCircleCopy: copyCircle,
            onCircleMemberClick,
            onMemberClick,
            onMemberMove: moveCircleMember,
            onCircleAdd,
            onMemberAdd: addMemberToCircle,
          },
        })
      }

      // (Re)-draw graph
      graphRef.current.update({
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
    onCircleClick,
    onCircleMemberClick,
    onMemberClick,
    onCircleAdd,
  ])

  // Remove SVG listeners on unmount
  useEffect(
    () => () => {
      if (graphRef.current) {
        graphRef.current.removeListeners()
      }
    },
    []
  )

  return (
    <Box flex={1} ref={boxRef} position="relative" overflow="hidden">
      <StyledSVG
        ref={svgRef}
        id={`graph-${orgId}`}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        textAnchor="middle"
      ></StyledSVG>

      {circleId !== undefined && (
        <CircleCreateModal
          parentId={circleId}
          isOpen={isCreateCircleOpen}
          onClose={onCreateCircleClose}
        />
      )}

      {panel === Panels.Circle && circleId && (
        <CirclePanel id={circleId} onClose={() => setPanel(undefined)} />
      )}

      {panel === Panels.Member && memberId && (
        <MemberPanel
          id={memberId}
          highlightCircleId={circleId || undefined}
          onCircleFocus={onCircleFocus}
          onClose={() => setPanel(undefined)}
        />
      )}
    </Box>
  )
}
