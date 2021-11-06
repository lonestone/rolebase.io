import { CircleEntry, CircleWithRoleEntry } from '@shared/circle'
import { MemberEntry } from '@shared/member'

export enum SearchItemTypes {
  Member,
  Circle,
  CircleMember,
}

export type SearchItem = {
  text: string
} & (
  | {
      type: SearchItemTypes.Member
      member: MemberEntry
    }
  | {
      type: SearchItemTypes.Circle
      circle: CircleEntry
      circleRoles: CircleWithRoleEntry[]
    }
  | {
      type: SearchItemTypes.CircleMember
      member?: MemberEntry
      circle: CircleEntry
      circleRoles: CircleWithRoleEntry[]
    }
)
