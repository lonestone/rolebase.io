import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { CirclesGraph } from './graphs/CirclesGraph'
import useCirclesGraph, { CirclesGraphProps } from './hooks/useCirclesGraph'
import useRenderer from './hooks/useRenderer'
import { CanvasRenderer } from './renderers/canvas/CanvasRenderer'

// Force reset with fast refresh
// @refresh reset

export default forwardRef<CirclesGraph | undefined, CirclesGraphProps>(
  function CirclesCanvasGraph(props, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    // Instanciate graph
    const graph = useCirclesGraph(canvasRef, props)
    useRenderer(graph, (graph) => new CanvasRenderer(graph))

    // Expose ref
    useImperativeHandle(ref, () => graph)

    return <canvas ref={canvasRef} />
  }
)
