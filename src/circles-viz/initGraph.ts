import * as d3 from 'd3'
import { ZoomTransform } from 'd3'
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
    .attr('dy', 3)

  // Zoom
  const zoomG = svg.append('g').attr('class', 'panzoom')

  const zoomBehaviour = d3
    .zoom<SVGSVGElement, any>()
    .filter(() => true) // Listen also to mouse wheel
    .scaleExtent(settings.zoom.scaleExtent as [number, number])
    .on('zoom', (event) => {
      zoom.x = event.transform.x
      zoom.y = event.transform.y
      zoom.scale = event.transform.k
      zoomG.attr('transform', event.transform)
      svgElement.style.setProperty('--zoom-scale', zoom.scale.toString())

      // Prevent from interacting with members when zoom < 1
      svgElement.style.setProperty(
        '--member-pointer-events',
        zoom.scale > 1 ? 'auto' : 'none'
      )
    })
  svg.call(zoomBehaviour).attr('cursor', 'move')

  const zoom: Zoom = {
    x: 0,
    y: 0,
    width: dimensions.width,
    height: dimensions.height,
    scale: 1,
    spaceKey: false,

    // Change extent to which we can zoom
    changeExtent(w, h) {
      zoomBehaviour.translateExtent([
        [-w, -h],
        [w, h],
      ])
    },

    // Zoom to coordinates
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
          new ZoomTransform(
            scale,
            -x * scale + dimensions.width / 2,
            -y * scale + dimensions.height / 2
          )
        )
    },

    // Conserve center on window resize
    changeDimensions(width: number, height: number, instant = false) {
      const transform = new ZoomTransform(
        zoom.scale,
        zoom.x - zoom.width / 2 + width / 2,
        zoom.y - zoom.height / 2 + height / 2
      )
      zoom.width = width
      zoom.height = height
      svg
        .transition()
        .duration(instant ? 0 : settings.zoom.duration)
        .ease(settings.zoom.transition)
        .call(zoomBehaviour.transform, transform)
    },
  }

  // Handle space key to prevent dragging circles during pan/zoom
  // Usefull only when a simple click is sufficient to drag a circle
  // const handleSpaceKey = (toggle: boolean) => (event: KeyboardEvent) => {
  //   if (event.key === ' ') {
  //     zoom.spaceKey = toggle
  //   }
  // }
  // const handleSpaceKeyDown = handleSpaceKey(true)
  // const handleSpaceKeyUp = handleSpaceKey(false)
  // document.addEventListener('keydown', handleSpaceKeyDown)
  // document.addEventListener('keyup', handleSpaceKeyUp)

  return {
    zoom,
    removeListeners() {
      // document.removeEventListener('keydown', handleSpaceKeyDown)
      // document.removeEventListener('keyup', handleSpaceKeyUp)
    },
  }
}
