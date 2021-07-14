import * as d3 from 'd3'
import settings from './settings'
import { Dimensions, Zoom } from './types'

interface GraphReturn {
  zoom: Zoom
  removeListeners: () => void
}

export function initGraph(
  svgElement: SVGSVGElement,
  dimensions: Dimensions
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

  const zoomBehaviour = d3
    .zoom<SVGSVGElement, any>()
    .filter((event) => true) // Listen also mouse wheel
    .scaleExtent(settings.zoom.scaleExtent as [number, number])
    .on('zoom', (event) => {
      zoom.x = event.transform.x
      zoom.y = event.transform.y
      zoom.scale = event.transform.k
      zoomG.attr('transform', event.transform)
      svgElement.style.setProperty('--zoom-scale', zoom.scale.toString())
    })
  svg.call(zoomBehaviour).attr('cursor', 'move')

  const zoom: Zoom = {
    x: 0,
    y: 0,
    scale: 1,
    spaceKey: false,
    changeExtent(w, h) {
      zoomBehaviour.translateExtent([
        [-200, -200],
        [w + 200, h + 200],
      ])
    },
    to(x, y, radius = 0, instant = false) {
      const scale = radius
        ? Math.min(
            settings.zoom.scaleExtent[1],
            Math.min(dimensions.width, dimensions.height) / (radius * 2)
          )
        : zoom.scale
      svg
        .transition()
        .duration(instant ? 0 : settings.zoom.duration)
        .ease(settings.zoom.transition)
        .call(
          zoomBehaviour.transform,
          d3.zoomIdentity
            .translate(
              -x * scale + dimensions.width / 2,
              -y * scale + dimensions.height / 2
            )
            .scale(scale)
        )
    },
  }

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
