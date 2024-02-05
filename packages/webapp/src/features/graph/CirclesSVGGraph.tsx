import { useColorMode } from '@chakra-ui/react'
import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { CirclesGraph } from './graphs/CirclesGraph'
import useCirclesGraph, { CirclesGraphProps } from './hooks/useCirclesGraph'
import { StyledSVG } from './renderers/svg/StyledSVG'

export default forwardRef<CirclesGraph | undefined, CirclesGraphProps>(
  function CirclesSVGGraph(props, ref) {
    const { colorMode } = useColorMode()
    const svgRef = useRef<SVGSVGElement>(null)

    // Instanciate graph
    const graphRef = useCirclesGraph(svgRef, props)

    // Expose ref
    useImperativeHandle(ref, () => graphRef.current)

    return (
      <StyledSVG
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
