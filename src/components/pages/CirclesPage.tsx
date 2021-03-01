import { Box, useDisclosure } from '@chakra-ui/react'
import styled from '@emotion/styled'
import useComponentSize from '@rehooks/component-size'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { createGraph, Graph } from '../../circles-viz/createGraph'
import {
  addMemberToCircle,
  copyCircle,
  moveCircle,
  moveCircleMember,
  useCircles,
} from '../../data/circles'
import { useMembers } from '../../data/members'
import { useRoles } from '../../data/roles'
import CircleCreateModal from '../circles/CircleCreateModal'
import CircleEditModal from '../circles/CircleEditModal'
import Loading from '../Loading'
import MemberModal from '../members/MemberModal'
import TextErrors from '../TextErrors'

interface Props {
  domId?: string
}

const StyledSVG = styled.svg`
  position: absolute;
  font: 10px sans-serif;
`

export default function CirclesPage({ domId = 'circles' }: Props) {
  // Data
  const [members, membersLoading, membersError] = useMembers()
  const [roles, rolesLoading, rolesError] = useRoles()
  const [circles, circlesLoading, circlesError] = useCircles()

  // Viz
  const boxRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const graphRef = useRef<Graph>()
  const { width, height } = useComponentSize(boxRef)

  // Add circle modal
  const {
    isOpen: isAddCircleOpen,
    onOpen: onAddCircleOpen,
    onClose: onAddCircleClose,
  } = useDisclosure()

  // Edit circle modal
  const [circleId, setCircleId] = useState<string | null | undefined>()
  const {
    isOpen: isEditCircleOpen,
    onOpen: onEditCircleOpen,
    onClose: onEditCircleClose,
  } = useDisclosure()

  // Member modal
  const [memberId, setMemberId] = useState<string | null | undefined>()
  const {
    isOpen: isMemberOpen,
    onOpen: onMemberOpen,
    onClose: onMemberClose,
  } = useDisclosure()

  // Click on a circle
  const onCircleClick = useCallback((circleId: string) => {
    setCircleId(circleId)
    onEditCircleOpen()
  }, [])

  // Click on a member in a circle
  const onCircleMemberClick = useCallback(
    (circleId: string, memberId: string) => {
      setMemberId(memberId)
      onMemberOpen()
    },
    []
  )

  // Click on a member in add menu
  const onMemberClick = useCallback((memberId: string) => {
    setMemberId(memberId)
    onMemberOpen()
  }, [])

  // Add circle
  const onCircleAdd = useCallback(
    (targetCircleId: string | null) => {
      setCircleId(targetCircleId)
      onAddCircleOpen()
    },
    [onAddCircleOpen]
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
          isOpen={isAddCircleOpen}
          onClose={onAddCircleClose}
        />
      )}

      {circleId && (
        <CircleEditModal
          id={circleId}
          isOpen={isEditCircleOpen}
          onClose={onEditCircleClose}
        />
      )}

      {memberId && (
        <MemberModal
          id={memberId}
          isOpen={isMemberOpen}
          onClose={onMemberClose}
        />
      )}
    </Box>
  )
}
