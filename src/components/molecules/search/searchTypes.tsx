import {
  CircleEntry,
  CircleMemberEntry,
  CircleWithRoleEntry,
} from '@shared/model/circle'
import { MemberEntry } from '@shared/model/member'
import { TaskEntry } from '@shared/model/task'
import { ThreadEntry } from '@shared/model/thread'

export enum SearchItemTypes {
  CreateAction,
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
      type: SearchItemTypes.CreateAction
    }
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
