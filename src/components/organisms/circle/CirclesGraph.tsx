import { useColorMode } from '@chakra-ui/react'
import { GraphZoomContext } from '@contexts/GraphZoomContext'
import styled from '@emotion/styled'
import { CircleFullFragment } from '@gql'
import { ColorModeProps, mode } from '@utils/colorMode'
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { getGraphInstance } from 'src/circles-viz'
import { Graph } from 'src/circles-viz/Graph'
import {
  GraphEvents,
  GraphViews,
  Position,
  ZoomFocusCircleScale,
} from 'src/circles-viz/types'
import { circleColor } from 'src/theme'

interface Props {
  id: string
  view: GraphViews
  circles: CircleFullFragment[]
  events: GraphEvents
  width: number
  height: number
  focusCrop?: Position
  focusCircleScale?: ZoomFocusCircleScale
  selectedCircleId?: string
  panzoomDisabled?: boolean
  onReady?(): void
}

type SVGProps = ColorModeProps & {
  view: GraphViews
  circleCursor: string
  selectedCircleId?: string
  width: number
  height: number
}

const StyledSVG = styled.svg<SVGProps>`
  font-family: var(--chakra-fonts-circles);
  font-size: 8px;
  font-weight: 600;
  fill: ${mode('#1a202c', 'rgba(255, 255, 255, 0.92)')};

  --circle-cursor: ${(p) => p.circleCursor};
  --member-pointer-events: auto;
  --graph-width: ${(p) => p.width};
  --graph-height: ${(p) => p.height};
  --graph-min-size: ${(p) => Math.min(p.width, p.height)};
  --depth-color-variation: 5%;

  circle {
    fill: transparent;
    cursor: var(--circle-cursor);
  }

  .type-Circle,
  .type-Member {
    circle {
      fill: ${(p) =>
        circleColor(
          mode(
            `calc(94% - (var(--depth) - 1) * var(--depth-color-variation))`, // Light theme
            `calc(16% + (var(--depth) - 1) * var(--depth-color-variation))` // Dark theme
          )(p),
          'var(--hue)'
        )};
    }

    &[data-hover] > circle {
      stroke: ${(p) =>
        circleColor(
          mode(
            `calc(88% - (var(--depth) - 1) * var(--depth-color-variation))`,
            `calc(22% + (var(--depth) - 1) * var(--depth-color-variation))`
          )(p),
          'var(--hue)'
        )};
      stroke-width: calc(4 / var(--zoom-scale));
    }

    // Selected
    &.circle-${(p) => p.selectedCircleId} > circle {
      stroke: ${(p) =>
        circleColor(
          mode(
            `calc(75% - (var(--depth) - 1) * var(--depth-color-variation))`,
            `calc(35% + (var(--depth) - 1) * var(--depth-color-variation))`
          )(p),
          'var(--hue)'
        )};
      stroke-width: calc(4 / var(--zoom-scale));
    }

    &[data-dragging] > circle {
      filter: url(#${({ id }) => id}-shadow);
      fill-opacity: 0.5;
    }

    &[data-drag-target] > circle {
      stroke: ${(p) => circleColor(mode('20%', '80%')(p))};
      stroke-width: 3px;
    }
  }

  .type-Member {
    // Hide member when zoom < 1
    opacity: ${(p) =>
      p.view === GraphViews.Members
        ? '1'
        : 'clamp(0, (var(--zoom-scale) - 1) * 10 + 1, 1)'};
    // Allow click only when zoom >= 1
    pointer-events: var(--member-pointer-events);
  }
`

export default forwardRef<Graph | undefined, Props>(function CirclesGraph(
  {
    id,
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
  const zoomContext = useContext(GraphZoomContext)

  // Viz
  const svgRef = useRef<SVGSVGElement>(null)
  const graphRef = useRef<Graph>()
  const [ready, setReady] = useState(false)

  // Expose ref
  useImperativeHandle(ref, () => graphRef.current)

  // Display viz and update data
  useEffect(() => {
    if (!svgRef.current) return

    // Init Graph
    if (!graphRef.current) {
      const svg = svgRef.current
      const params = {
        width,
        height,
        focusCrop,
        focusCircleScale,
        events,
      }
      const graph = getGraphInstance(view, svg, params)

      // Change ready state after first draw
      graph.addDrawListener(() => setReady(true), true)
      graphRef.current = graph
      zoomContext?.setZoom(graph.zoom)
    }

    // (Re)-draw graph
    graphRef.current.updateData(circles)
  }, [view, circles, ...Object.values(events)])

  // Update dimensions
  useEffect(() => {
    if (width === 0 || height === 0) return
    graphRef.current?.zoom.changeDimensions(width, height, focusCrop)
  }, [width, height, focusCrop, focusCircleScale])

  // Update panzoom disabled state
  useEffect(() => {
    const graph = graphRef.current
    if (!graph) return
    graph.zoom.disabled = panzoomDisabled || false
  }, [panzoomDisabled])

  // Unmount
  useEffect(
    () => () => {
      // Reset zoom context
      zoomContext?.setZoom(undefined)
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

  // Cursor depending on ctrl and shift keys
  // It's useful for the drag behavior
  const [cursor, setCursor] = useState('pointer')
  useEffect(() => {
    if (!events.onCircleClick || !events.onMemberClick) {
      setCursor('default')
      return
    }
    let shift = false
    let ctrl = false
    const handler = (event: KeyboardEvent) => {
      const newShift = event.shiftKey
      const newCtrl = event.ctrlKey || event.metaKey
      if (newShift !== shift || newCtrl !== ctrl) {
        shift = newShift
        ctrl = newCtrl
        setCursor(ctrl ? (shift ? 'copy' : 'grab') : 'pointer')
      }
    }
    document.body.addEventListener('keydown', handler)
    document.body.addEventListener('keyup', handler)
    return () => {
      document.body.removeEventListener('keydown', handler)
      document.body.removeEventListener('keyup', handler)
    }
  }, [events.onCircleClick, events.onMemberClick])

  return (
    <StyledSVG
      ref={svgRef}
      id={id}
      view={view}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      textAnchor="middle"
      circleCursor={cursor}
      selectedCircleId={selectedCircleId}
      colorMode={colorMode}
    />
  )
})
