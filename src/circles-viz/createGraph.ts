import { CircleWithRoleEntry } from '@shared/model/circle'
import { MemberEntry } from '@shared/model/member'
import { initGraph } from './initGraph'
import { DrawEventHandler, DrawEventListener, Zoom } from './types'
import updateCircles from './updateCircles'

export interface Graph {
  zoom: Zoom
  addDrawListener: DrawEventListener
  removeListeners(): void
  updateData(circles: CircleWithRoleEntry[], members: MemberEntry[]): void
}

export interface GraphParams {
  width: number
  height: number
  events: GraphEvents
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
  onClickOutside?(): void
}

export function createGraph(
  svg: SVGSVGElement,
  { width, height, events }: GraphParams
): Graph {
  const { zoom, removeListeners } = initGraph(svg, width, height)

  // Handle outside click
  svg.addEventListener('click', (event) => {
    if (event.target === svg) {
      events.onClickOutside?.()
    }
  })

  // Draw event
  const drawHandlers: Array<DrawEventHandler> = []
  function addDrawListener(handler: () => void, once = false) {
    drawHandlers.push({ once, handler })
  }

  return {
    zoom,
    addDrawListener,
    removeListeners,
    updateData(circles, members) {
      // Create/update circles and menu
      updateCircles(svg, {
        circles,
        members,
        events,
        zoom,
        addDrawListener,
      })

      // Trigger draw events
      for (let i = drawHandlers.length - 1; i >= 0; i--) {
        const { once, handler } = drawHandlers[i]
        handler()
        if (once) drawHandlers.splice(i, 1)
      }
    },
  }
}
