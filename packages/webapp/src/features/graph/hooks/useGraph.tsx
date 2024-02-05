import { useColorMode } from '@chakra-ui/react'
import { useContext, useEffect, useRef, useState } from 'react'
import { GraphContext } from '../contexts/GraphContext'
import { Graph } from '../graphs/Graph'
import {
  GraphEvents,
  GraphParams,
  Position,
  ZoomFocusCircleScale,
} from '../types'

export interface GraphProps<Data, TGraph extends Graph<Data>> {
  init(params: GraphParams): TGraph
  data: Data
  events?: GraphEvents
  width: number
  height: number
  focusCrop?: Position
  focusCircleScale?: ZoomFocusCircleScale
  selectedCircleId?: string
  panzoomDisabled?: boolean
  onReady?(): void
}

export default function useGraph<Data, TGraph extends Graph<Data>>({
  init,
  data,
  events,
  width,
  height,
  focusCrop,
  focusCircleScale,
  selectedCircleId,
  panzoomDisabled,
  onReady,
}: GraphProps<Data, TGraph>) {
  const graphContext = useContext(GraphContext)
  const { colorMode } = useColorMode()

  // Viz
  const graphRef = useRef<TGraph>()
  const [ready, setReady] = useState(false)

  // Display viz and update data
  useEffect(() => {
    // Init Graph
    if (!graphRef.current) {
      const params = {
        width,
        height,
        colorMode,
        focusCrop,
        focusCircleScale,
        events: events || {},
      }
      const graph = init(params)

      // Change ready state after first draw
      graph.once('nodesData', () => setReady(true))
      graphRef.current = graph
      graphContext?.setGraph(graph)
    }

    // (Re)-draw graph
    graphRef.current.updateData(data)
  }, [data])

  // Update dimensions
  useEffect(() => {
    if (width === 0 || height === 0) return
    graphRef.current?.resize(width, height, focusCrop)
  }, [width, height, focusCrop])

  // Update panzoom disabled state
  useEffect(() => {
    const graph = graphRef.current
    if (!graph) return
    graph.zoomDisabled = panzoomDisabled || false
  }, [panzoomDisabled])

  // Unmount
  useEffect(
    () => () => {
      // Unmount graph
      graphRef.current?.destroy()
      graphContext?.setGraph(undefined)
    },
    []
  )

  // Focus on a circle when focusCircleId is defined
  useEffect(() => {
    if (ready) {
      graphRef.current?.selectCircle(selectedCircleId)
    }
  }, [ready, selectedCircleId])

  // Call prop onReady when ready
  useEffect(() => {
    if (ready) {
      onReady?.()
    }
  }, [ready])

  return graphRef
}
