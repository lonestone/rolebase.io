import { ZoomTransform } from 'd3'
import { Actions } from 'pixi-actions'
import { Simple as Culling } from 'pixi-cull'
import { addStats } from 'pixi-stats'
import * as PIXI from 'pixi.js'
import { CirclesGraph } from '../../graphs/CirclesGraph'
import { NodeData, NodeType } from '../../types'
import Renderer from '../Renderer'
import { CircleObject } from './nodes/CircleObject'
import { MemberObject } from './nodes/MemberObject'
import { NodeObject } from './nodes/NodeObject'
import './stats.css'

const debug = false
const circleTextureSize = 512

export class CanvasRenderer extends Renderer {
  public pixiApp: PIXI.Application<PIXI.ICanvas>
  public container: PIXI.Container
  private culling: Culling
  protected nodeObjects = new Map<string, NodeObject>()

  // Shared textures
  public avatarsTextures = new Map<string, PIXI.RenderTexture>()
  private circleTexture: PIXI.RenderTexture | undefined

  constructor(public graph: CirclesGraph) {
    super()
    const { element, width, height, params } = graph

    // Init PIXI
    this.pixiApp = new PIXI.Application({
      width,
      height,
      backgroundColor: params.colorMode === 'light' ? 0xffffff : 0x1a1714,
      antialias: true,
      view: element as HTMLCanvasElement,
      autoDensity: true,
      resolution: Math.floor(window.devicePixelRatio),
    })
    this.pixiApp.ticker.add((delta) => Actions.tick(delta / 60))

    // Add stats
    if (debug) {
      const stats = addStats(document, this.pixiApp)
      PIXI.Ticker.shared.add(stats.update, stats, PIXI.UPDATE_PRIORITY.UTILITY)
    }

    // Zoom
    this.container = new PIXI.Container()
    this.container.sortableChildren = true
    this.pixiApp.stage.addChild(this.container)
    graph.on('zoom', this.onZoom)
    graph.on('zoomScale', this.onZoomScale)
    graph.on('zoomPosition', this.onZoomPosition)

    // Resize
    graph.on('resize', this.onResize)

    // Culling
    this.culling = new Culling()
    this.culling.addList(this.container.children)

    // Listen to data updates
    this.graph.on('nodesData', this.onNodesData)
  }

  destroy() {
    // Remove listeners
    this.graph.off('zoom', this.onZoom)
    this.graph.off('zoomScale', this.onZoomScale)
    this.graph.off('zoomPosition', this.onZoomPosition)
    this.graph.off('resize', this.onResize)

    // Destroy PIXI
    this.avatarsTextures.forEach((texture) => texture.destroy())
    this.circleTexture?.destroy()
    this.pixiApp.destroy()
  }

  private onZoom = () => {
    // Update culling
    const { zoomX, zoomY, focusCrop, zoomScale, width, height } = this.graph
    this.culling.cull({
      x: (-zoomX + focusCrop.left) / zoomScale,
      y: (-zoomY + focusCrop.top) / zoomScale,
      width: (width - focusCrop.left - focusCrop.right) / zoomScale,
      height: (height - focusCrop.top - focusCrop.bottom) / zoomScale,
    })
  }

  private onZoomScale = (scale: number) => {
    this.container.scale.set(scale)
  }

  private onZoomPosition = (transform: ZoomTransform) => {
    this.container.position.set(transform.x, transform.y)
  }

  private onResize = () => {
    const { width, height } = this.graph
    this.pixiApp.renderer.resize(width, height)
  }

  private onNodesData = (nodesData: NodeData[]) => {
    // Add circle groups
    this.graph.d3Root
      .selectAll('.circle')
      .data(nodesData, (d: any) => d.data.id)
      .join(
        // Create Circle
        (nodeEnter) => {
          return nodeEnter
            .append('circle')
            .attr('class', 'circle')
            .each((d) => {
              const nodeObject = this.nodeObjects.get(d.data.id)
              if (nodeObject) return
              if (d.data.type === NodeType.Circle) {
                this.nodeObjects.set(d.data.id, new CircleObject(this, d))
              } else if (d.data.type === NodeType.Member) {
                this.nodeObjects.set(d.data.id, new MemberObject(this, d))
              }
            })
        },

        // Update Circle
        (nodeUpdate) => {
          return nodeUpdate.each((d) => {
            const nodeObject = this.nodeObjects.get(d.data.id)
            nodeObject?.update(d)
          })
        },

        // Remove Circle
        (nodeExit) => {
          return nodeExit.each((d) => {
            const nodeObject = this.nodeObjects.get(d.data.id)
            if (nodeObject) {
              nodeObject.remove()
              this.nodeObjects.delete(d.data.id)
            }
          })
        }
      )
  }

  public getCircleTexture(): PIXI.RenderTexture {
    if (this.circleTexture) return this.circleTexture
    const shape = new PIXI.Graphics()
    shape.beginFill(0xffffff).drawCircle(0, 0, circleTextureSize)
    this.circleTexture = this.pixiApp.renderer.generateTexture(shape)
    shape.destroy()
    return this.circleTexture
  }
}
