import { Action, Actions } from 'pixi-actions'
import * as PIXI from 'pixi.js'
import settings from '../../../settings'
import { NodeData, NodeType } from '../../../types'
import { CanvasRenderer } from '../CanvasRenderer'
import { NodeObject } from './NodeObject'

export class CircleObject extends NodeObject {
  private circleSprite: PIXI.Sprite

  constructor(
    protected renderer: CanvasRenderer,
    d: NodeData
  ) {
    super(renderer, d)

    if (d.data.type !== NodeType.Circle) {
      throw new Error(
        `Invalid node type. Expected ${NodeType.Circle} but got ${d.data.type}`
      )
    }

    // Display circle
    const sprite = (this.circleSprite = new PIXI.Sprite(
      this.renderer.getCircleTexture()
    ))
    sprite.width = sprite.height = this.d.r * 2
    sprite.anchor.set(0.5)
    sprite.tint = this.getBackgroundColor()
    this.container.addChild(sprite)
  }

  update(d: NodeData) {
    // Detect changes
    const radiusChanged = d.r !== this.d.r
    const colorChanged = d.data.colorHue !== this.d.data.colorHue

    // Set new data
    super.update(d)

    const actions: Action[] = []

    // Animate new radius
    if (radiusChanged) {
      const scale = (d.r * 2) / this.circleSprite.texture.width
      actions.push(
        Actions.scaleTo(
          this.circleSprite,
          scale,
          scale,
          settings.move.duration / 1000,
          settings.move.transition
        )
      )
    }

    // Change color
    if (colorChanged) {
      this.circleSprite.tint = this.getBackgroundColor()
    }

    if (actions.length) {
      Actions.parallel(...actions).play()
    }
  }

  remove() {
    super.remove()
  }

  protected onClick() {
    this.graph.params.events.onCircleClick?.(this.d.data.id)
  }
}
