import { CircleEntry } from '../api/entities/circles'
import { MemberEntry } from '../api/entities/members'
import { RoleEntry } from '../api/entities/roles'
import { initGraph } from './initGraph'
import { DrawEventHandler, DrawEventListener, Zoom } from './types'
import updateAddMenu from './updateAddMenu'
import updateCircles from './updateCircles'

export interface Graph {
  zoom: Zoom
  addDrawListener: DrawEventListener
  removeListeners(): void
  update(params: UpdateGraphParams): void
}

export interface GraphParams {
  width: number
  height: number
  events: GraphEvents
}

export interface UpdateGraphParams {
  circles: CircleEntry[]
  roles: RoleEntry[]
  members: MemberEntry[]
}

export interface GraphEvents {
  onCircleClick?(circleId: string): void
  onCircleMove?(circleId: string, targetCircleId: string | null): void
  onCircleCopy?(circleId: string, targetCircleId: string | null): void
  onCircleMemberClick?(circleId: string, memberId: string): void
  onMemberClick?(memberId: string): void
  onMemberMove?(
    memberId: string,
    parentCircleId: string,
    targetCircleId: string | null
  ): void
  onCircleAdd?(targetCircleId: string | null): void
  onMemberAdd?(memberId: string, targetCircleId: string): void
}

export function createGraph(
  svg: SVGSVGElement,
  { width, height, events }: GraphParams
): Graph {
  const { zoom, removeListeners } = initGraph(svg, { width, height })

  // Draw event
  const drawHandlers: Array<DrawEventHandler> = []
  function addDrawListener(handler: () => void, once = false) {
    drawHandlers.push({ once, handler })
  }

  return {
    zoom,
    addDrawListener,
    removeListeners,
    update({ circles, roles, members }) {
      // Create/update circles and menu
      updateCircles(svg, {
        circles,
        roles,
        members,
        width,
        height,
        events,
        zoom,
        addDrawListener,
      })
      updateAddMenu(svg, { members, width, height, events, zoom })

      // Trigger draw events
      for (let i = drawHandlers.length - 1; i >= 0; i--) {
        const { once, handler } = drawHandlers[i]
        handler()
        if (once) drawHandlers.splice(i, 1)
      }
    },
  }
}
