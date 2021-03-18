import { Box, useDisclosure } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  addMemberToCircle,
  copyCircle,
  moveCircle,
  moveCircleMember,
} from '../../api/entities/circles'
import { createGraph, Graph } from '../../circles-viz/createGraph'
import { useNavigateToCircle } from '../../hooks/useNavigateToCircle'
import { useNavigateToCircleMember } from '../../hooks/useNavigateToCircleMember'
import useOverflowHidden from '../../hooks/useOverflowHidden'
import useQueryParams from '../../hooks/useQuery'
import useWindowSize from '../../hooks/useWindowSize'
import CircleCreateModal from '../circles/CircleCreateModal'
import CirclePanel from '../circles/CirclePanel'
import MemberPanel from '../members/MemberPanel'
import { useStoreState } from '../store/hooks'

type CirclesPageParams = {
  circleId: string
  memberId: string
}

enum Panels {
  Circle,
  Member,
}

const StyledSVG = styled.svg`
  position: absolute;
  font: 10px sans-serif;
`

export default function CirclesPage() {
  useOverflowHidden()

  // Navigation
  const queryParams = useQueryParams<CirclesPageParams>()
  const navigateToCircle = useNavigateToCircle()
  const navigateToCircleMember = useNavigateToCircleMember()

  // Data
  const orgId = useStoreState((state) => state.orgs.currentId)
  const circles = useStoreState((state) => state.circles.entries)
  const members = useStoreState((state) => state.members.entries)
  const roles = useStoreState((state) => state.roles.entries)

  // Viz
  const boxRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const graphRef = useRef<Graph>()
  const { width, height } = useWindowSize(boxRef)
  const [ready, setReady] = useState(false)

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
        const graph = createGraph(svgRef.current, {
          width,
          height,
          events: {
            onCircleClick: navigateToCircle,
            onCircleMove: moveCircle,
            onCircleCopy: copyCircle,
            onCircleMemberClick: navigateToCircleMember,
            onMemberClick,
            onMemberMove: moveCircleMember,
            onCircleAdd,
            onMemberAdd: addMemberToCircle,
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
    navigateToCircle,
    navigateToCircleMember,
    onMemberClick,
    onCircleAdd,
  ])

  // Remove SVG listeners on unmount
  useEffect(() => () => graphRef.current?.removeListeners(), [])

  // URL params
  useEffect(() => {
    if (!ready || !queryParams.circleId) return

    // Focus circle
    onCircleFocus(queryParams.circleId)
    setCircleId(queryParams.circleId)

    // Open panel
    if (queryParams.memberId) {
      setMemberId(queryParams.memberId)
      setPanel(Panels.Member)
    } else {
      setPanel(Panels.Circle)
    }
  }, [ready, queryParams.circleId, queryParams.memberId, onCircleFocus])

  return (
    <Box flex={1} ref={boxRef} position="relative" overflow="hidden">
      {orgId && (
        <StyledSVG
          ref={svgRef}
          id={`graph-${orgId}`}
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          textAnchor="middle"
        ></StyledSVG>
      )}

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
