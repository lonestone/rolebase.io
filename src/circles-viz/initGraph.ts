import * as d3 from 'd3'
import { Transition } from 'd3'
import settings from './settings'
import { Zoom } from './types'

interface InitParams {
  width: number
  height: number
}

interface GraphReturn {
  zoom: Zoom
  removeListeners: () => void
}

export function initGraph(
  svgElement: SVGSVGElement,
  { width, height }: InitParams
): GraphReturn {
  const svg = d3.select(svgElement)
  const svgId = svg.attr('id')

  // Shadow filter
  svg
    .append('filter')
    .attr('id', `${svgId}-shadow`)
    .append('feDropShadow')
    .attr('flood-opacity', 0.3)
    .attr('dx', 0)
    .attr('dy', 1)

  // Zoom
  const zoomG = svg.append('g').attr('class', 'panzoom')
  let zoomTransition:
    | Transition<SVGGElement, unknown, null, undefined>
    | undefined

  const zoomBehaviour = d3
    .zoom<SVGSVGElement, any>()
    .filter((event) => true)
    .scaleExtent(settings.zoom.scaleExtent as [number, number])
    .on('zoom', (event) => {
      zoom.x = event.transform.x
      zoom.y = event.transform.y
      zoom.scale = event.transform.k
      if (!zoomTransition) {
        zoomTransition = zoomG.transition().duration(150).ease(d3.easeLinear)
      }
      zoomTransition
        .attr('transform', event.transform)
        .call(() => (zoomTransition = undefined))
    })
  svg.call(zoomBehaviour).attr('cursor', 'move')

  const zoom: Zoom = {
    x: 0,
    y: 0,
    scale: 1,
    spaceKey: false,
    changeExtent(w, h) {
      zoomBehaviour.translateExtent([
        [-w / 2, -h / 2],
        [(w * 3) / 2, (h * 3) / 2],
      ])
    },
    to(x, y, radius, instant) {
      const scale = Math.min(
        settings.zoom.scaleExtent[1],
        Math.min(width, height) / (radius * 2)
      )
      svg
        .transition()
        .duration(instant ? 0 : settings.zoom.duration)
        .ease(settings.zoom.transition)
        .call(
          zoomBehaviour.transform,
          d3.zoomIdentity
            .translate(-x * scale + width / 2, -y * scale + height / 2)
            .scale(scale)
        )
    },
  }
  // zoom.changeExtent(width, height)

  // Handle space key to prevent dragging circles during pan/zoom
  const handleSpaceKey = (toggle: boolean) => (event: KeyboardEvent) => {
    if (event.key === ' ') {
      zoom.spaceKey = toggle
    }
  }
  const handleSpaceKeyDown = handleSpaceKey(true)
  const handleSpaceKeyUp = handleSpaceKey(false)
  document.addEventListener('keydown', handleSpaceKeyDown)
  document.addEventListener('keyup', handleSpaceKeyUp)

  return {
    zoom,
    removeListeners() {
      document.removeEventListener('keydown', handleSpaceKeyDown)
      document.removeEventListener('keyup', handleSpaceKeyUp)
    },
  }
}
