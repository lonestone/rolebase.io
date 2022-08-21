import { CircleEntry, CircleWithRoleEntry } from '@shared/model/circle'
import { MemberEntry } from '@shared/model/member'
import { RoleEntry } from '@shared/model/role'
import { TaskEntry } from '@shared/model/task'
import { ThreadEntry } from '@shared/model/thread'

export enum SearchItemTypes {
  CreateAction,
  Member,
  Role,
  Circle,
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
      type: SearchItemTypes.Role
      role: RoleEntry
    }
  | {
      type: SearchItemTypes.Circle
      circle: CircleEntry
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
