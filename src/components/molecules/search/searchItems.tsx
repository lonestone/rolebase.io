import {
  CircleEntry,
  CircleMemberEntry,
  CircleWithRoleEntry,
} from '@shared/circle'
import { MemberEntry } from '@shared/member'
import { ThreadEntry } from '@shared/thread'

export enum SearchItemTypes {
  Member,
  Circle,
  CircleMember,
  Thread,
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
      member: MemberEntry
      circle: CircleEntry
      circleMember: CircleMemberEntry
      circleRoles: CircleWithRoleEntry[]
    }
  | {
      type: SearchItemTypes.Thread
      thread: ThreadEntry
    }
)

export function getSearchItemId(item: SearchItem): string {
  switch (item.type) {
    case SearchItemTypes.Member:
      return item.member.id
    case SearchItemTypes.Circle:
      return item.circle.id
    case SearchItemTypes.CircleMember:
      return item.circleMember.id
    case SearchItemTypes.Thread:
      return item.thread.id
  }
}
