import { Box } from '@chakra-ui/react'
import styled from '@emotion/styled'
import useComponentSize from '@rehooks/component-size'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { initGraph, updateGraph } from '../circles-viz/circles-d3'
import { useMembers } from '../data/members'
import { circlesMock, rolesMock } from '../data/mock'

interface Props {
  domId?: string
}

const StyledSVG = styled.svg`
  font: 10px sans-serif;
`

export default function Circles({ domId = 'circles' }: Props) {
  const [members, loading, error] = useMembers()
  const boxRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const svgInitRef = useRef<boolean>(false)
  const { width, height } = useComponentSize(boxRef)
  const [count, setCount] = useState(0)

  const handleCircleMove = useCallback(
    (circleId: string, targetCircleId: string | null): boolean => {
      const circle = circlesMock.find((circle) => circle.id === circleId)
      if (circle) {
        // Change parent circle
        circle.parentId = targetCircleId
        setCount((c) => c + 1)
        return true
      }
      return false
    },
    []
  )

  const handleMemberMove = useCallback(
    (
      memberId: string,
      parentCircleId: string,
      targetCircleId: string | null
    ): boolean => {
      const currentCircle = circlesMock.find(
        (circle) => circle.id === parentCircleId
      )
      const targetCircle = circlesMock.find(
        (circle) => circle.id === targetCircleId
      )
      if (!currentCircle) return false

      const index = currentCircle.members.findIndex(
        (entry) => entry.memberId === memberId
      )

      if (targetCircleId === null) {
        // Remove member from circle
        if (index !== -1) {
          currentCircle.members.splice(index, 1)
          setCount((c) => c + 1)
          return true
        }
      }
      if (targetCircle) {
        // Do nothing if member already in target circle
        if (
          targetCircle.members.findIndex(
            (entry) => entry.memberId === memberId
          ) !== -1
        ) {
          return false
        }

        // Add member to target circle and remove from current circle
        if (index !== -1) {
          targetCircle.members.push(currentCircle.members[index])
          currentCircle.members.splice(index, 1)
          setCount((c) => c + 1)
          return true
        }
      }
      return false
    },
    []
  )

  useEffect(() => {
    if (svgRef.current && width !== 0 && height !== 0 && members) {
      if (!svgInitRef.current) {
        svgInitRef.current = true
        initGraph(svgRef.current)
      }
      updateGraph(svgRef.current, {
        circles: circlesMock,
        roles: rolesMock,
        members,
        width,
        height,
        onCircleMove: handleCircleMove,
        onMemberMove: handleMemberMove,
      })
    }
  }, [circlesMock, rolesMock, members, width, height, count])

  return (
    <Box flex={1} ref={boxRef}>
      {count}
      <StyledSVG
        ref={svgRef}
        id={domId}
        width="100%"
        height="100vh"
        viewBox={`0 0 ${width} ${height}`}
        textAnchor="middle"
      ></StyledSVG>
    </Box>
  )
}
