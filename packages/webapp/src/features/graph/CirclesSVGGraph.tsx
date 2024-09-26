import { useColorMode } from '@chakra-ui/react'
import { nanoid } from 'nanoid'
import React, { forwardRef, useImperativeHandle, useMemo, useRef } from 'react'
import { CirclesGraph } from './graphs/CirclesGraph'
import useCirclesGraph, { CirclesGraphProps } from './hooks/useCirclesGraph'
import useRenderer from './hooks/useRenderer'
import { StyledSVG } from './renderers/svg/StyledSVG'
import { SVGRenderer } from './renderers/svg/SVGRenderer'

// Force reset with fast refresh
// @refresh reset

export default forwardRef<CirclesGraph | undefined, CirclesGraphProps>(
  function CirclesSVGGraph(props, ref) {
    const { colorMode } = useColorMode()
    const svgRef = useRef<SVGSVGElement>(null)
    const id = useMemo(() => nanoid(), [])

    // Instanciate graph
    const graph = useCirclesGraph(svgRef, props)
    useRenderer(graph, (graph) => new SVGRenderer(graph))

    // Expose ref
    useImperativeHandle(ref, () => graph)

    return (
      <StyledSVG
        id={id}
        ref={svgRef}
        view={props.view}
        width={props.width}
        height={props.height}
        focusWidth={
          props.width -
          (props.focusCrop?.left || 0) -
          (props.focusCrop?.right || 0)
        }
        focusHeight={
          props.height -
          (props.focusCrop?.top || 0) -
          (props.focusCrop?.bottom || 0)
        }
        viewBox={`0 0 ${props.width} ${props.height}`}
        textAnchor="middle"
        selectedCircleId={props.selectedCircleId}
        colorMode={colorMode}
      />
    )
  }
)
