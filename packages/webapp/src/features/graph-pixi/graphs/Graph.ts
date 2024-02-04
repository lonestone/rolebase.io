import { CircleFullFragment } from '@gql'
import * as d3 from 'd3'
import { ZoomTransform } from 'd3'
import EventEmitter from 'eventemitter3'
import debounce from 'lodash.debounce'
import throttle from 'lodash.throttle'
import { Actions } from 'pixi-actions'
import { Simple } from 'pixi-cull'
import { addStats } from 'pixi-stats'
import * as PIXI from 'pixi.js'
import settings from '../settings'
import {
  Data,
  DrawEventHandler,
  GraphParams,
  NodeData,
  Position,
  ZoomFocusCircleScale,
} from '../types'
import './stats.css'

const debug = false

const defaultFocusCrop: Position = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
}

const defaultFocusCircleScale: ZoomFocusCircleScale = (node) =>
  Math.max(200, node.r * 1.05)

export abstract class Graph extends EventEmitter {
  public canvasD3: d3.Selection<HTMLCanvasElement, NodeData, null, undefined>
  public pixiApp: PIXI.Application<PIXI.ICanvas>
  public container: PIXI.Container
  public zoomDisabled = false

  protected selectedCircleId?: string
  protected width: number
  protected height: number
  protected zoomX = 0
  protected zoomY = 0
  public zoomScale = 1
  protected zoomBehaviour: d3.ZoomBehavior<HTMLCanvasElement, NodeData>
  protected focusCircleScale: ZoomFocusCircleScale
  protected focusCrop: Position
  protected focusOffsetX: number
  protected focusOffsetY: number
  protected rootRadius: number

  private unmounted = false
  private drawHandlers: Array<DrawEventHandler> = []

  constructor(
    public canvas: HTMLCanvasElement,
    public params: GraphParams
  ) {
    super()

    // Zoom
    const { width, height, colorMode, focusCrop, focusCircleScale } =
      this.params
    this.width = width
    this.height = height
    this.zoomDisabled = params.zoomDisabled || false
    this.focusCircleScale = focusCircleScale || defaultFocusCircleScale
    this.focusCrop = focusCrop || defaultFocusCrop
    this.focusOffsetX = getFocusOffsetX(width, focusCrop || defaultFocusCrop)
    this.focusOffsetY = getFocusOffsetY(height, focusCrop || defaultFocusCrop)
    this.rootRadius = 0

    // Init PIXI
    this.pixiApp = new PIXI.Application({
      width,
      height,
      backgroundColor: colorMode === 'light' ? 0xffffff : 0x1a1714,
      antialias: true,
      view: this.canvas,
      autoDensity: true,
      resolution: Math.floor(window.devicePixelRatio),
    })
    this.pixiApp.ticker.add((delta) => Actions.tick(delta / 60))

    // Add stats
    if (debug) {
      const stats = addStats(document, this.pixiApp)
      PIXI.Ticker.shared.add(stats.update, stats, PIXI.UPDATE_PRIORITY.UTILITY)
    }

    // Get d3 selection
    this.canvasD3 = d3.select<HTMLCanvasElement, NodeData>(this.canvas)

    // Zoom container
    this.container = new PIXI.Container()
    this.container.sortableChildren = true
    this.pixiApp.stage.addChild(this.container)

    // Zoom behaviour
    this.zoomBehaviour = d3
      .zoom<HTMLCanvasElement, NodeData>()
      .filter(() => !this.zoomDisabled) // Listen also to mouse wheel
      .scaleExtent(settings.zoom.scaleExtent as [number, number])
      .on('zoom', (event) => {
        if (this.unmounted) return
        const hasMoved =
          this.zoomX !== event.transform.x || this.zoomY !== event.transform.y
        const hasZoomed = this.zoomScale !== event.transform.k

        if (hasMoved) {
          this.container.position.x = event.transform.x
          this.container.position.y = event.transform.y
          this.zoomX = event.transform.x
          this.zoomY = event.transform.y
        }
        if (hasZoomed) {
          this.container.scale.x = event.transform.k
          this.container.scale.y = event.transform.k
          this.zoomScale = event.transform.k
          this.emit('scaled', event.transform.k)
          this.updatePanExtentDebounced()
        }
        if (hasMoved || hasZoomed) {
          cullingDirty = true
        }
      })
    this.canvasD3.call(this.zoomBehaviour)

    // Culling
    const cull = new Simple()
    cull.addList(this.container.children)

    // Cull whenever the viewport moves
    let cullingDirty = true
    this.pixiApp.ticker.add(() => {
      if (cullingDirty) {
        cull.cull({
          x: (-this.zoomX + this.focusCrop.left) / this.zoomScale,
          y: (-this.zoomY + this.focusCrop.top) / this.zoomScale,
          width:
            (this.width - this.focusCrop.left - this.focusCrop.right) /
            this.zoomScale,
          height:
            (this.height - this.focusCrop.top - this.focusCrop.bottom) /
            this.zoomScale,
        })
        cullingDirty = false
      }
    })
  }

  protected abstract prepareData(circles: CircleFullFragment[]): Data
  protected abstract draw(data: Data): void

  unmount() {
    this.unmounted = true
    this.pixiApp.destroy()
  }

  updateData(circles: CircleFullFragment[]) {
    // Prepare data
    const data = this.prepareData(circles)
    // Draw graph
    this.draw(data)

    // Trigger draw events
    for (let i = this.drawHandlers.length - 1; i >= 0; i--) {
      const { once, handler } = this.drawHandlers[i]
      handler()
      if (once) this.drawHandlers.splice(i, 1)
    }
  }

  addDrawListener(handler: () => void, once = false) {
    this.drawHandlers.push({ once, handler })
  }

  selectCircle(id: string | undefined) {
    this.selectedCircleId = id
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
    const extentX =
      this.rootRadius * 2 * this.zoomScale < this.width / 2
        ? this.width / this.zoomScale - this.rootRadius
        : this.width / this.zoomScale / 2 + this.rootRadius
    const extentY =
      this.rootRadius * 2 * this.zoomScale < this.height / 2
        ? this.height / this.zoomScale - this.rootRadius
        : this.height / this.zoomScale / 2 + this.rootRadius

    this.zoomBehaviour.translateExtent([
      [
        -extentX + this.focusCrop.right / this.zoomScale,
        -extentY + this.focusCrop.bottom / this.zoomScale,
      ],
      [
        extentX - this.focusCrop.left / this.zoomScale,
        extentY - this.focusCrop.top / this.zoomScale,
      ],
    ])
  }

  updatePanExtentDebounced = debounce(this.updatePanExtent, 50)

  getDragEventPosition(event: d3.D3DragEvent<SVGGElement, Data, Element>) {
    return {
      x: (event.sourceEvent.offsetX - this.zoomX) / this.zoomScale,
      y: (event.sourceEvent.offsetY - this.zoomY) / this.zoomScale,
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
      : this.zoomScale

    // Prevent from zooming to an intermediate state where opacity of members is too low
    if (scale > 0.8 && scale < 1) {
      scale = 0.8
    }

    this.canvasD3
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
  changeDimensions = throttle(
    (width: number, height: number, focusCrop?: Position) => {
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
        Math.min(cropWidth, cropHeight) /
        Math.min(prevCropWidth, prevCropHeight)

      const transform = new ZoomTransform(
        // Change scale to keep framing
        this.zoomScale * scaleRatio,
        // Reposition
        (this.zoomX - this.focusOffsetX) * scaleRatio + focusOffsetX,
        (this.zoomY - this.focusOffsetY) * scaleRatio + focusOffsetY
      )

      this.width = width
      this.height = height
      this.focusCrop = focusCrop
      this.focusOffsetX = focusOffsetX
      this.focusOffsetY = focusOffsetY

      // Apply zoom
      this.canvasD3
        .transition()
        .duration(settings.zoom.duration)
        .ease(settings.zoom.transition)
        .call(this.zoomBehaviour.transform, transform)

      // Update PIXI canvas size
      this.pixiApp.renderer.resize(width, height)
    },
    500
  )

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
    // Get descendants nodes data from svg
    const nodesMap = this.canvasD3
      .selectAll<SVGGElement, NodeData>('circle')
      .data()
    if (nodesMap.length === 0) return

    const node = nodeId
      ? // Find node by id
        nodesMap.find((n) => n.data.id === nodeId)
      : // Find biggest node
        nodesMap.reduce(
          (n, biggest) => (n.r > biggest.r ? n : biggest),
          nodesMap[0]
        )

    if (!node) return
    this.focusNode(node, adaptScale, instant)
  }

  focusNodeIdAfterDraw(
    nodeId?: string,
    adaptScale?: boolean,
    instant?: boolean
  ) {
    this.addDrawListener(
      // () => setTimeout(() => this.focusNodeId(nodeId, adaptScale, instant), 500),
      () => this.focusNodeId(nodeId, adaptScale, instant),
      true
    )
  }

  // Update CSS variables according to zoom
  // updateCSSVariables() {
  //   this.canvas.style.setProperty('--zoom-scale', this.zoomScale.toString())
  //   // Prevent from interacting with members when zoom < 1
  //   this.canvas.style.setProperty(
  //     '--member-pointer-events',
  //     this.zoomScale > 1 ? 'auto' : 'none'
  //   )
  // }
}

const getFocusOffsetX = (width: number, focusCrop: Position) =>
  (width - focusCrop.left - focusCrop.right) / 2 + focusCrop.left

const getFocusOffsetY = (height: number, focusCrop: Position) =>
  (height - focusCrop.top - focusCrop.bottom) / 2 + focusCrop.top
