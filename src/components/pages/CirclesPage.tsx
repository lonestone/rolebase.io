import { Box, Center, Spinner, useDisclosure } from '@chakra-ui/react'
import styled from '@emotion/styled'
import useComponentSize from '@rehooks/component-size'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { initGraph } from '../../circles-viz/initGraph'
import { updateGraph } from '../../circles-viz/updateGraph'
import {
  addMemberToCircle,
  moveCircle,
  moveCircleMember,
  useCircles,
} from '../../data/circles'
import { useMembers } from '../../data/members'
import { useRoles } from '../../data/roles'
import CircleCreateModal from '../circles/CircleCreateModal'
import CircleEditModal from '../circles/CircleEditModal'
import TextError from '../TextError'

interface Props {
  domId?: string
}

const StyledSVG = styled.svg`
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
  const svgInitRef = useRef<boolean>(false)
  const { width, height } = useComponentSize(boxRef)

  // Add circle
  const [circleId, setCircleId] = useState<string | null | undefined>()
  const {
    isOpen: isAddCircleOpen,
    onOpen: onAddCircleOpen,
    onClose: onAddCircleClose,
  } = useDisclosure()
  const {
    isOpen: isEditCircleOpen,
    onOpen: onEditCircleOpen,
    onClose: onEditCircleClose,
  } = useDisclosure()

  const onCircleClick = useCallback((circleId: string) => {
    setCircleId(circleId)
    onEditCircleOpen()
  }, [])

  const onCircleMemberClick = useCallback(
    (circleId: string, memberId: string) => {
      console.log('click member', memberId, 'in circle', circleId)
    },
    []
  )

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
      if (!svgInitRef.current) {
        svgInitRef.current = true
        initGraph(svgRef.current)
      }
      updateGraph(svgRef.current, {
        circles, // : circlesMock,
        roles, // : rolesMock,
        members,
        width,
        height,
        onCircleClick,
        onCircleMemberClick,
        onCircleMove: moveCircle,
        onMemberMove: moveCircleMember,
        onCircleAdd,
        onMemberAdd: addMemberToCircle,
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
    onCircleAdd,
  ])

  return (
    <Box flex={1} ref={boxRef}>
      {
        // Loading
        membersLoading || circlesLoading || rolesLoading ? (
          <Center height="100%">
            <Spinner size="xl" />
          </Center>
        ) : // Errors
        [membersError, rolesError, circlesError].some(Boolean) ? (
          <>
            {[membersError, rolesError, circlesError]
              .filter(Boolean)
              .map((error, i) =>
                error ? <TextError key={i} error={error} /> : null
              )}
          </>
        ) : (
          <StyledSVG
            ref={svgRef}
            id={domId}
            width="100%"
            height="100%"
            viewBox={`0 0 ${width} ${height}`}
            textAnchor="middle"
          ></StyledSVG>
        )
      }

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
    </Box>
  )
}
