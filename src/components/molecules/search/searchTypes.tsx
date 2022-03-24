import {
  CircleEntry,
  CircleMemberEntry,
  CircleWithRoleEntry,
} from '@shared/circle'
import { MemberEntry } from '@shared/member'
import { TaskEntry } from '@shared/task'
import { ThreadEntry } from '@shared/thread'

export enum SearchItemTypes {
  Member,
  Circle,
  CircleMember,
  Thread,
  Task,
}

export type SearchItem = {
  id: string
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
  | {
      type: SearchItemTypes.Task
      task: TaskEntry
    }
)
