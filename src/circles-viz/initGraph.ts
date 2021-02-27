import * as d3 from 'd3'
import { Zoom } from './types'

interface InitParams {
  zoom: Zoom
  width: number
  height: number
}

export function initGraph(
  svgElement: SVGSVGElement,
  { width, height, zoom }: InitParams
): () => void {
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

  svg.call(
    d3
      .zoom<SVGSVGElement, any>()
      .filter((event) => true)
      .translateExtent([
        [0, 0],
        [width, height],
      ])
      .scaleExtent([1, 8])
      .on('zoom', (event) => {
        zoom.x = event.transform.x
        zoom.y = event.transform.y
        zoom.scale = event.transform.k
        zoomG.attr('transform', event.transform)
      })
  )

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

  // removeListeners
  return () => {
    document.removeEventListener('keydown', handleSpaceKeyDown)
    document.removeEventListener('keyup', handleSpaceKeyUp)
  }
}
