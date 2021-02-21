import { Box } from '@chakra-ui/react'
import useComponentSize from '@rehooks/component-size'
import React, { useEffect, useRef } from 'react'
import { initGraph, updateGraph } from '../circles-viz/circles-d3'
import { useMembers } from '../data/members'
import { circlesMock, rolesMock } from '../data/mock'

interface Props {
  domId?: string
}

export default function Circles({ domId = 'circles' }: Props) {
  const [members, loading, error] = useMembers()
  const boxRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const svgInitRef = useRef<boolean>(false)
  const { width, height } = useComponentSize(boxRef)

  useEffect(() => {
    if (svgRef.current && width !== 0 && height !== 0 && members) {
      if (!svgInitRef.current) {
        svgInitRef.current = true
        initGraph(svgRef.current)
      }
      updateGraph(
        svgRef.current,
        circlesMock,
        rolesMock,
        members,
        width,
        height
      )
    }
  }, [circlesMock, rolesMock, members, width, height])

  return (
    <Box flex={1} ref={boxRef}>
      <svg
        ref={svgRef}
        id={domId}
        width="100%"
        height="100vh"
        viewBox={`0 0 ${width} ${height}`}
        style={{ font: '10px sans-serif' }}
        textAnchor="middle"
      ></svg>
    </Box>
  )
}
