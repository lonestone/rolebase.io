import * as d3 from 'd3'
import { ZoomTransform } from 'd3'
import EventEmitter from 'eventemitter3'
import debounce from 'lodash.debounce'
import throttle from 'lodash.throttle'
import settings from '../settings'
import {
  Data,
  GraphParams,
  NodeData,
  Position,
  RootElement,
  ZoomFocusCircleScale,
} from '../types'

const defaultFocusCrop: Position = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
}

const defaultFocusCircleScale: ZoomFocusCircleScale = (node) =>
  Math.max(200, node.r * 1.05)

export type GraphEmitterEvents = {
  zoomPosition: [ZoomTransform]
  zoomScale: [number]
  zoom: [ZoomTransform]
  resize: void
  nodesData: [NodeData[]]
  selectCircle: [string | undefined]
}

export abstract class Graph<
  InputData = any,
> extends EventEmitter<GraphEmitterEvents> {
  public d3Root: d3.Selection<RootElement, NodeData, null, undefined>
  public zoomDisabled = false
  public inputData: InputData | undefined
  public nodes: NodeData[] = []
  public selectedCircleId?: string
  public width: number
  public height: number
  public zoomTransform = new ZoomTransform(1, 0, 0)
  protected zoomBehaviour: d3.ZoomBehavior<RootElement, any>
  protected focusCircleScale: ZoomFocusCircleScale
  public focusCrop: Position
  protected focusOffsetX: number
  protected focusOffsetY: number
  protected rootRadius: number
  private unmounted = false

  constructor(
    public element: RootElement,
    public params: GraphParams
  ) {
    super()

    // Params
    const { width, height, focusCrop, focusCircleScale } = this.params
    this.width = width
    this.height = height
    this.zoomDisabled = params.zoomDisabled || false
    this.focusCircleScale = focusCircleScale || defaultFocusCircleScale
    this.focusCrop = focusCrop || defaultFocusCrop
    this.focusOffsetX = getFocusOffsetX(width, focusCrop || defaultFocusCrop)
    this.focusOffsetY = getFocusOffsetY(height, focusCrop || defaultFocusCrop)
    this.rootRadius = 0

    // D3 root selection
    this.d3Root = d3.select<RootElement, NodeData>(element)

    // Zoom
    this.zoomBehaviour = d3
      .zoom<RootElement, any>()
      .filter(() => !this.zoomDisabled) // Listen also to mouse wheel
      .scaleExtent(settings.zoom.scaleExtent as [number, number])
      .on('zoom', (event) => {
        if (this.unmounted) return
        const hasMoved =
          this.zoomTransform.x !== event.transform.x ||
          this.zoomTransform.y !== event.transform.y
        const hasScaled = this.zoomTransform.k !== event.transform.k
        this.zoomTransform = event.transform
        if (hasMoved) {
          this.emit('zoomPosition', event.transform)
        }
        if (hasScaled) {
          this.emit('zoomScale', event.transform.k)
          this.updatePanExtentDebounced()
        }
        if (hasMoved || hasScaled) {
          this.emit('zoom', event.transform)
        }
      })
    this.d3Root.call(this.zoomBehaviour)
  }

  destroy() {
    this.unmounted = true
    this.d3Root.on('.zoom', null)
    // Remove listeners
    this.removeAllListeners()
  }

  updateData(data: InputData) {
    this.inputData = data
  }

  selectCircle(id: string | undefined) {
    this.selectedCircleId = id
    this.emit('selectCircle', id)
    if (id) {
      // Let draw first, then focus on circle
      setTimeout(() => this.focusNodeId(id, true), 100)
    }
  }

  updateRootRadius(radius: number) {
    this.rootRadius = radius
    this.updatePanExtent()
  }

  // Change extent to which we can pan
  updatePanExtent() {
    const {
      width,
      height,
      rootRadius,
      zoomTransform: { k },
      focusCrop,
    } = this
    const extentX =
      rootRadius * 2 * k < width / 2
        ? width / k - rootRadius
        : width / k / 2 + rootRadius
    const extentY =
      rootRadius * 2 * k < height / 2
        ? height / k - rootRadius
        : height / k / 2 + rootRadius

    this.zoomBehaviour?.translateExtent([
      [-extentX + focusCrop.right / k, -extentY + focusCrop.bottom / k],
      [extentX - focusCrop.left / k, extentY - focusCrop.top / k],
    ])
  }

  updatePanExtentDebounced = debounce(this.updatePanExtent, 50)

  getDragEventPosition(event: d3.D3DragEvent<SVGGElement, Data, Element>) {
    const { x, y, k } = this.zoomTransform
    return {
      x: (event.sourceEvent.offsetX - x) / k,
      y: (event.sourceEvent.offsetY - y) / k,
    }
  }

  // Zoom to coordinates
  zoomTo(x: number, y: number, radius = 0, instant = false) {
    let scale = radius
      ? Math.min(
          settings.zoom.scaleExtent[1],
          Math.min(
            this.width - this.focusCrop.left - this.focusCrop.right,
            this.height - this.focusCrop.top - this.focusCrop.bottom
          ) /
            (radius * 2)
        )
      : this.zoomTransform.k

    // Prevent from zooming to an intermediate state where opacity of members is too low
    if (scale > 0.8 && scale < 1) {
      scale = 0.8
    }

    this.d3Root
      .transition()
      .duration(instant ? 0 : settings.zoom.duration)
      .ease(settings.zoom.transition)
      .call(
        this.zoomBehaviour.transform,
        new ZoomTransform(
          scale,
          -x * scale + this.focusOffsetX,
          -y * scale + this.focusOffsetY
        )
      )
  }

  // Conserve center on window resize
  resize = throttle((width: number, height: number, focusCrop?: Position) => {
    if (this.unmounted) return
    focusCrop = focusCrop || defaultFocusCrop

    const focusOffsetX = getFocusOffsetX(width, focusCrop)
    const focusOffsetY = getFocusOffsetY(height, focusCrop)

    // Compute scale change ratio
    const prevCropWidth =
      this.width - this.focusCrop.left - this.focusCrop.right
    const prevCropHeight =
      this.height - this.focusCrop.top - this.focusCrop.bottom
    const cropWidth = width - focusCrop.left - focusCrop.right
    const cropHeight = height - focusCrop.top - focusCrop.bottom
    const scaleRatio =
      Math.min(cropWidth, cropHeight) / Math.min(prevCropWidth, prevCropHeight)

    const transform = new ZoomTransform(
      // Change scale to keep framing
      this.zoomTransform.k * scaleRatio,
      // Reposition
      (this.zoomTransform.x - this.focusOffsetX) * scaleRatio + focusOffsetX,
      (this.zoomTransform.y - this.focusOffsetY) * scaleRatio + focusOffsetY
    )

    this.width = width
    this.height = height
    this.focusCrop = focusCrop
    this.focusOffsetX = focusOffsetX
    this.focusOffsetY = focusOffsetY

    this.d3Root
      .transition()
      .duration(settings.zoom.duration)
      .ease(settings.zoom.transition)
      .call(this.zoomBehaviour.transform, transform)

    this.emit('resize')
  }, 500)

  // Zoom on a node
  focusNode(node: NodeData, adaptScale?: boolean, instant?: boolean) {
    if (!node.r) return
    this.zoomTo(
      node.x,
      node.y,
      adaptScale ? this.focusCircleScale(node) : 0,
      instant
    )
  }

  // Zoom on a node
  focusNodeId(nodeId?: string, adaptScale?: boolean, instant?: boolean) {
    if (!this.nodes || this.nodes.length === 0) return

    const node = nodeId
      ? // Find node by id
        this.nodes.find((n) => n.data.id === nodeId)
      : // Find biggest node
        this.nodes.reduce(
          (n, biggest) => (n.r > biggest.r ? n : biggest),
          this.nodes[0]
        )

    if (!node) return
    this.focusNode(node, adaptScale, instant)
  }

  focusNodeIdAfterData(
    nodeId?: string,
    adaptScale?: boolean,
    instant?: boolean
  ) {
    this.once('nodesData', () => this.focusNodeId(nodeId, adaptScale, instant))
  }
}

const getFocusOffsetX = (width: number, focusCrop: Position) =>
  (width - focusCrop.left - focusCrop.right) / 2 + focusCrop.left

const getFocusOffsetY = (height: number, focusCrop: Position) =>
  (height - focusCrop.top - focusCrop.bottom) / 2 + focusCrop.top
