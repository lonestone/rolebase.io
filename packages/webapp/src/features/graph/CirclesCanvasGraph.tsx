import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { CirclesGraph } from './graphs/CirclesGraph'
import useCirclesGraph, { CirclesGraphProps } from './hooks/useCirclesGraph'

// Force reset with fast refresh
// @refresh reset

export default forwardRef<CirclesGraph | undefined, CirclesGraphProps>(
  function CirclesCanvasGraph(props, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    // Instanciate graph
    const graphRef = useCirclesGraph(canvasRef, props)

    // Expose ref
    useImperativeHandle(ref, () => graphRef.current)

    return <canvas ref={canvasRef} />
  }
)
