import { CircleEntry } from '../data/circles'
import { MemberEntry } from '../data/members'
import { RoleEntry } from '../data/roles'
import updateAddMenu from './updateAddMenu'
import updateCircles from './updateCircles'

interface GraphParams {
  circles: CircleEntry[]
  roles: RoleEntry[]
  members: MemberEntry[]
  width: number
  height: number
  onCircleClick?(circleId: string): void
  onCircleMemberClick?(circleId: string, memberId: string): void
  onCircleMove?(circleId: string, targetCircleId: string | null): void
  onMemberMove?(
    memberId: string,
    parentCircleId: string,
    targetCircleId: string | null
  ): void
  onCircleAdd?(targetCircleId: string | null): void
  onMemberAdd?(memberId: string, targetCircleId: string): void
}

export function updateGraph(
  svgElement: SVGSVGElement,
  {
    circles,
    roles,
    members,
    width,
    height,
    onCircleClick,
    onCircleMemberClick,
    onCircleMove,
    onMemberMove,
    onCircleAdd,
    onMemberAdd,
  }: GraphParams
) {
  updateCircles(svgElement, {
    circles,
    roles,
    members,
    width,
    height,
    onCircleClick,
    onCircleMemberClick,
    onCircleMove,
    onMemberMove,
  })
  updateAddMenu(svgElement, { members, onCircleAdd, onMemberAdd })
}
