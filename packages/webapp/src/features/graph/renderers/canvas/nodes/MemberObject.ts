import * as PIXI from 'pixi.js'
import settings from '../../../settings'
import { NodeData, NodeType } from '../../../types'
import { CanvasRenderer } from '../CanvasRenderer'
import { NodeObject } from './NodeObject'

const memberTextStyle: Partial<PIXI.ITextStyle> = {
  fontFamily: settings.style.fontFamily,
  fontSize: 30,
  fill: 0xffffff,
  stroke: 0x000000,
  strokeThickness: 4,
}

const scaleToShowName = 1.3

export class MemberObject extends NodeObject {
  private nameText: PIXI.Text
  private avatarSprite: PIXI.Sprite

  constructor(
    protected renderer: CanvasRenderer,
    d: NodeData
  ) {
    super(renderer, d)

    if (d.data.type !== NodeType.Member) {
      throw new Error(
        `Invalid node type. Expected ${NodeType.Member} but got ${d.data.type}`
      )
    }

    // Display avatar
    const sprite = (this.avatarSprite = new PIXI.Sprite())
    sprite.width = sprite.height = this.d.r * 2
    sprite.anchor.set(0.5)
    this.container.addChild(sprite)
    this.setAvatar()

    // Display member name
    const text = (this.nameText = new PIXI.Text(
      this.getName(),
      memberTextStyle
    ))
    text.scale.set(0.3)
    text.anchor.set(0.5)
    text.position.set(0, this.d.r - 10)
    this.container.addChild(text)
    this.graph.on('zoomScale', (scale) => {
      if (!this.nameText) return
      this.nameText.visible = scale > scaleToShowName
    })
  }

  update(d: NodeData) {
    // Detect changes
    const nameChanged = d.data.name !== this.d.data.name
    const pictureChanged = d.data.picture !== this.d.data.picture
    const colorChanged = d.data.colorHue !== this.d.data.colorHue

    // Set new data
    super.update(d)

    // Update member name
    if (nameChanged && this.nameText) {
      this.nameText.text = this.getName()
    }

    // Update member avatar
    if (pictureChanged) {
      this.setAvatar()
    }
    // Update color (if no picture)
    else if (colorChanged && !d.data.picture) {
      this.avatarSprite.tint = this.getBackgroundColor()
    }
  }

  remove() {
    super.remove()
  }

  private getName() {
    const { name } = this.d.data
    return name.replace(/ .*$/, '')
  }

  private setAvatar() {
    this.getAvatarTexture(this.d.data.picture)
      // Set loaded texture
      .then((texture) => {
        this.avatarSprite.texture = texture
        this.avatarSprite.tint = 0xffffff
      })
      // Image not loaded
      // Fall back to circle shape
      .catch((e) => {
        this.avatarSprite.texture = this.renderer.getCircleTexture()
        this.avatarSprite.tint = this.getBackgroundColor()
      })
  }

  private async getAvatarTexture(
    pictureUrl: string | null | undefined
  ): Promise<PIXI.RenderTexture> {
    if (!pictureUrl) throw new Error('No picture url')

    const cachedTexture = this.renderer.avatarsTextures.get(pictureUrl)
    if (cachedTexture) return cachedTexture

    // Load avatar texture
    const texture = await PIXI.Texture.fromURL(pictureUrl)
    const sprite = new PIXI.Sprite(texture)
    sprite.height = sprite.width
    const radius = sprite.width / 2

    // Apply circle mask to round avatar
    sprite.mask = new PIXI.Graphics()
      .beginFill(0xffffff)
      .drawCircle(radius, radius, radius)

    // Generate texture
    const roundedTexture =
      this.renderer.pixiApp.renderer.generateTexture(sprite)
    sprite.destroy()

    this.renderer.avatarsTextures.set(pictureUrl, roundedTexture)
    return roundedTexture
  }

  protected onClick() {
    const {
      data: { parentId, entityId },
    } = this.d
    if (parentId && entityId) {
      this.graph.params.events.onMemberClick?.(parentId, entityId)
    }
  }
}
