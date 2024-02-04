import { useColorMode } from '@chakra-ui/react'
import { CircleFullFragment } from '@gql'
import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { getGraphInstance } from '.'
import { GraphContext } from './contexts/GraphContext'
import { Graph } from './graphs/Graph'
import {
  GraphEvents,
  GraphViews,
  Position,
  ZoomFocusCircleScale,
} from './types'

interface Props {
  view: GraphViews
  circles: CircleFullFragment[]
  events?: GraphEvents
  width: number
  height: number
  focusCrop?: Position
  focusCircleScale?: ZoomFocusCircleScale
  selectedCircleId?: string
  panzoomDisabled?: boolean
  onReady?(): void
}

export default forwardRef<Graph | undefined, Props>(function CirclesGraph(
  {
    view,
    circles,
    events,
    width,
    height,
    focusCrop,
    focusCircleScale,
    selectedCircleId,
    panzoomDisabled,
    onReady,
  },
  ref
) {
  // Utils
  const { colorMode } = useColorMode()
  const graphContext = useContext(GraphContext)

  // Viz
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const graphRef = useRef<Graph>()
  const [ready, setReady] = useState(false)

  // Expose ref
  useImperativeHandle(ref, () => graphRef.current)

  // Display viz and update data
  useEffect(() => {
    if (!canvasRef.current) return

    // Init Graph
    if (!graphRef.current) {
      const svg = canvasRef.current
      const params = {
        width,
        height,
        colorMode,
        focusCrop,
        focusCircleScale,
        events: events || {},
      }
      const graph = getGraphInstance(view, svg, params)

      // Change ready state after first draw
      graph.addDrawListener(() => setReady(true), true)
      graphRef.current = graph
      graphContext?.setGraph(graph)
    }

    // (Re)-draw graph
    graphRef.current.updateData(circles)
  }, [view, circles, events, colorMode])

  // Update dimensions
  useEffect(() => {
    if (width === 0 || height === 0) return
    graphRef.current?.changeDimensions(width, height, focusCrop)
  }, [width, height, focusCrop, focusCircleScale])

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
      graphRef.current?.unmount()
      // Reset zoom context
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

  // // Cursor depending on ctrl and shift keys
  // // It's useful for the drag behavior
  // const [cursor, setCursor] = useState('pointer')
  // useEffect(() => {
  //   const canClick = !!(events?.onCircleClick && events?.onMemberClick)
  //   const canMove = !!(events?.onCircleMove && events?.onMemberMove)
  //   const canCopy = !!(events?.onCircleCopy && events?.onMemberAdd)

  //   if (!canClick) {
  //     setCursor('default')
  //     return
  //   }
  //   let shift = false
  //   let ctrl = false
  //   const handler = (event: KeyboardEvent) => {
  //     const newShift = event.shiftKey
  //     const newCtrl = event.ctrlKey || event.metaKey
  //     if (newShift !== shift || newCtrl !== ctrl) {
  //       shift = newShift
  //       ctrl = newCtrl
  //       if (canCopy && ctrl && shift) {
  //         setCursor('copy')
  //       } else if (canMove && ctrl) {
  //         setCursor('grab')
  //       } else if (canClick) {
  //         setCursor('pointer')
  //       }
  //     }
  //   }
  //   document.body.addEventListener('keydown', handler)
  //   document.body.addEventListener('keyup', handler)
  //   return () => {
  //     document.body.removeEventListener('keydown', handler)
  //     document.body.removeEventListener('keyup', handler)
  //   }
  // }, [events])

  return <canvas ref={canvasRef} />
})
