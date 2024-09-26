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
  const [graph, setGraph] = useState<TGraph>()
  const graphRef = useRef<TGraph>()

  // Instanciate graph
  useEffect(() => {
    const params = {
      width,
      height,
      colorMode,
      focusCrop,
      focusCircleScale,
      events: events || {},
    }
    const graph = init(params)
    graphRef.current = graph
    setGraph(graph)
    graphContext?.setGraph(graph)
    onReady?.()
  }, [])

  // Update data
  useEffect(() => {
    graphRef.current?.updateData(data)
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
      graphRef.current?.destroy()
      graphContext?.setGraph(undefined)
    },
    []
  )

  // Re-apply data after graph is instanciated
  useEffect(() => {
    if (graph?.inputData) {
      graph.updateData(graph.inputData)
    }
  }, [graph])

  // Focus on a circle
  useEffect(() => {
    graphRef.current?.selectCircle(selectedCircleId)
  }, [selectedCircleId])

  return graph
}
