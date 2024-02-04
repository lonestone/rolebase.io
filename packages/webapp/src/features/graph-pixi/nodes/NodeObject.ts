import { defaultCircleColorHue } from '@shared/helpers/circleColor'
import { Actions } from 'pixi-actions'
import * as PIXI from 'pixi.js'
import { CirclesGraph } from '../graphs/CirclesGraph'
import settings from '../settings'
import { NodeData, NodeType } from '../types'

const clickMaxMove = 9
const depthColorVariation = 5
const hoverBorderWidth = 4

export abstract class NodeObject {
  protected d: NodeData
  protected container: PIXI.Container
  protected borderShape: PIXI.Graphics | undefined
  protected clickingPosition: PIXI.Point | undefined

  constructor(
    protected graph: CirclesGraph,
    d: NodeData
  ) {
    this.d = d

    // Circle container
    this.container = this.initContainer()

    // Events
    this.initEvents()
  }

  update(d: NodeData) {
    // Detect changes
    const positionChanged = d.x !== this.d.x || d.y !== this.d.y
    const radiusChanged = d.r !== this.d.r

    // Set new data
    this.d = d

    // Animate new position
    if (positionChanged) {
      Actions.moveTo(
        this.container,
        d.x,
        d.y,
        settings.move.duration / 1000,
        settings.move.transition
      ).play()
    }

    // Change hit area
    if (radiusChanged) {
      this.container.hitArea = null
      setTimeout(() => {
        this.container.hitArea = new PIXI.Circle(0, 0, d.r)
      }, settings.move.duration)
    }
  }

  remove() {
    // Animate position and scale
    const { x, y } = this.getParentPosition()
    Actions.parallel(
      Actions.moveTo(
        this.container,
        x,
        y,
        settings.move.duration / 1000,
        settings.move.transition
      ),
      Actions.scaleTo(
        this.container,
        0,
        0,
        settings.move.duration / 1000,
        settings.move.transition
      )
    )
      // Destroy container
      .queue(Actions.runFunc(() => this.container.destroy()))
      .play()
  }

  private initContainer(): PIXI.Container {
    const d = this.d
    const container = new PIXI.Container()
    container.zIndex = d.depth
    this.graph.container.addChild(container)

    // Animate position and scale
    container.position.copyFrom(this.getParentPosition())
    container.scale.set(0)
    Actions.parallel(
      Actions.moveTo(
        container,
        d.x,
        d.y,
        settings.move.duration / 1000,
        settings.move.transition
      ),
      Actions.scaleTo(
        container,
        1,
        1,
        settings.move.duration / 1000,
        settings.move.transition
      )
    ).play()

    return container
  }

  private initEvents() {
    const obj = this.container
    obj.eventMode = 'dynamic'
    obj.cursor = 'pointer'
    obj.hitArea = new PIXI.Circle(0, 0, this.d.r)

    // Click
    obj.on('pointerdown', (event) => {
      this.clickingPosition = new PIXI.Point(event.x, event.y)
    })
    obj.on('pointerup', (event) => {
      if (!this.clickingPosition) return
      const position = new PIXI.Point(event.x, event.y)
      const distance =
        Math.pow(position.x - this.clickingPosition.x, 2) +
        Math.pow(position.y - this.clickingPosition.y, 2)
      if (distance > clickMaxMove) return
      this.onClick()
    })

    // Enter/leave
    obj.on('pointerover', this.onPointerOver.bind(this))
    obj.on('pointerout', this.onPointerOut.bind(this))

    // Zoom scale
    this.graph.on('scaled', this.onZoomScale.bind(this))
  }

  protected abstract onClick(): void

  protected onPointerOver() {
    if (this.borderShape) return
    this.borderShape = new PIXI.Graphics()
      .lineStyle(hoverBorderWidth / this.graph.zoomScale, this.getBorderColor())
      .drawCircle(0, 0, this.d.r)
    this.container.addChild(this.borderShape)
  }

  protected onPointerOut() {
    this.borderShape?.destroy()
    this.borderShape = undefined
  }

  protected onZoomScale(scale: number) {
    this.borderShape
      ?.clear()
      .lineStyle(hoverBorderWidth / scale, this.getBorderColor())
      .drawCircle(0, 0, this.d.r)
  }

  protected getParentPosition() {
    if (this.d.data.type === NodeType.Member) {
      console.log(this.d.parent?.data.type)
    }
    return (
      (this.d.data.type === NodeType.Member && this.d.parent?.parent) ||
      this.d.parent ||
      this.d
    )
  }

  protected getBackgroundColor() {
    return this.getCircleColor(94, 16)
  }

  protected getBorderColor() {
    return this.getCircleColor(88, 22)
  }

  protected getCircleColor(lightBaseHue: number, darkBaseHue: number) {
    const lightness =
      this.graph.params.colorMode === 'light'
        ? lightBaseHue - (this.d.depth - 1) * depthColorVariation
        : darkBaseHue + (this.d.depth - 1) * depthColorVariation
    return new PIXI.Color({
      h: this.d.data.colorHue ?? defaultCircleColorHue,
      s: lightness / 2 + 25,
      l: lightness,
    })
  }
}
