import { CircleEntry } from '../data/circles'
import { MemberEntry } from '../data/members'
import { RoleEntry } from '../data/roles'
import { initGraph } from './initGraph'
import { Zoom } from './types'
import updateAddMenu from './updateAddMenu'
import updateCircles from './updateCircles'

export interface Graph {
  zoom: Zoom
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
  onCircleMemberClick?(circleId: string, memberId: string): void
  onCircleMove?(circleId: string, targetCircleId: string | null): void
  onCircleCopy?(circleId: string, targetCircleId: string | null): void
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

  return {
    zoom,
    removeListeners,
    update({ circles, roles, members }: UpdateGraphParams) {
      updateCircles(svg, {
        circles,
        roles,
        members,
        width,
        height,
        events,
        zoom,
      })
      updateAddMenu(svg, { members, events, zoom })
    },
  }
}
