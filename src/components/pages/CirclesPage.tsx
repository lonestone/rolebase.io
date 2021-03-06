import { Box, useDisclosure } from '@chakra-ui/react'
import styled from '@emotion/styled'
import useComponentSize from '@rehooks/component-size'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  addMemberToCircle,
  copyCircle,
  moveCircle,
  moveCircleMember,
  useContextCircles,
} from '../../api/entities/circles'
import { useContextMembers } from '../../api/entities/members'
import { useContextRoles } from '../../api/entities/roles'
import { createGraph, Graph } from '../../circles-viz/createGraph'
import CircleCreateModal from '../circles/CircleCreateModal'
import CirclePanel from '../circles/CirclePanel'
import Loading from '../common/Loading'
import TextErrors from '../common/TextErrors'
import MemberPanel from '../members/MemberPanel'

interface Props {
  domId?: string
}

enum Panels {
  Circle,
  Member,
}

const StyledSVG = styled.svg`
  position: absolute;
  font: 10px sans-serif;
`

export default function CirclesPage({ domId = 'circles' }: Props) {
  // Data
  // const {
  //   members: [members, membersLoading, membersError],
  //   roles: [roles, rolesLoading, rolesError],
  //   circles: [circles, circlesLoading, circlesError],
  // } = useContext(OrgContext)
  const [members, membersLoading, membersError] = useContextMembers()
  const [roles, rolesLoading, rolesError] = useContextRoles()
  const [circles, circlesLoading, circlesError] = useContextCircles()

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
    graphRef.current?.zoom.focusCircle?.(circleId)
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
      <Loading active={membersLoading || circlesLoading || rolesLoading} />
      <TextErrors errors={[membersError, rolesError, circlesError]} />

      <StyledSVG
        ref={svgRef}
        id={domId}
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
