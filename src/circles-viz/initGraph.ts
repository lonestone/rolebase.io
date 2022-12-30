import * as d3 from 'd3'
import { ZoomTransform } from 'd3'
import settings from './settings'
import { Position, Zoom } from './types'

interface GraphReturn {
  zoom: Zoom
  removeListeners: () => void
}

const defaultFocusCrop: Position = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
}

export function initGraph(
  svgElement: SVGSVGElement,
  width: number,
  height: number,
  focusCrop?: Position
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
    .filter(() => !zoom.disabled) // Listen also to mouse wheel
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
  svg.call(zoomBehaviour)

  const zoom: Zoom = {
    x: 0,
    y: 0,
    width,
    height,
    focusCrop: focusCrop || defaultFocusCrop,
    focusOffsetX: getFocusOffsetX(width, focusCrop || defaultFocusCrop),
    focusOffsetY: getFocusOffsetY(height, focusCrop || defaultFocusCrop),
    scale: 1,
    disabled: false,

    // Change extent to which we can zoom
    changeExtent(w, h) {
      zoomBehaviour.translateExtent([
        [-2 * w, -2 * h],
        [2 * w, 2 * h],
      ])
    },

    // Zoom to coordinates
    to(x, y, radius = 0, instant = false) {
      const scale = radius
        ? Math.min(
            settings.zoom.scaleExtent[1],
            Math.min(
              zoom.width - zoom.focusCrop.left - zoom.focusCrop.right,
              zoom.height - zoom.focusCrop.top - zoom.focusCrop.bottom
            ) /
              (radius * 2)
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
            -x * scale + zoom.focusOffsetX,
            -y * scale + zoom.focusOffsetY
          )
        )
    },

    // Conserve center on window resize
    changeDimensions(width: number, height: number, focusCrop?: Position) {
      focusCrop = focusCrop || defaultFocusCrop

      const focusOffsetX = getFocusOffsetX(width, focusCrop)
      const focusOffsetY = getFocusOffsetY(height, focusCrop)

      const transform = new ZoomTransform(
        zoom.scale,
        // Reposition to conserve x,y
        zoom.x - zoom.focusOffsetX + focusOffsetX,
        zoom.y - zoom.focusOffsetY + focusOffsetY
      )

      zoom.width = width
      zoom.height = height
      zoom.focusCrop = focusCrop
      zoom.focusOffsetX = focusOffsetX
      zoom.focusOffsetY = focusOffsetY

      svg
        .transition()
        .duration(settings.zoom.duration)
        .ease(settings.zoom.transition)
        .call(zoomBehaviour.transform, transform)
    },
  }

  return {
    zoom,
    removeListeners() {
      // Add listeners to remove when the graph is destroyed
    },
  }
}

const getFocusOffsetX = (width: number, focusCrop: Position) =>
  (width - focusCrop.left - focusCrop.right) / 2 + focusCrop.left

const getFocusOffsetY = (height: number, focusCrop: Position) =>
  (height - focusCrop.top - focusCrop.bottom) / 2 + focusCrop.top
