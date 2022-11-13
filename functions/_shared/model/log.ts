import { Circle, CircleMember } from './circle'
import { Decision } from './decision'
import { Member } from './member'
import { Role } from './role'
import { Task, TaskStatus } from './task'
import { WithId } from './types'

export enum LogType {
  CircleCreate = 'CircleCreate',
  CircleMove = 'CircleMove',
  CircleCopy = 'CircleCopy',
  CircleArchive = 'CircleArchive',
  CircleMemberAdd = 'CircleMemberAdd',
  CircleMemberRemove = 'CircleMemberRemove',
  RoleCreate = 'RoleCreate',
  RoleUpdate = 'RoleUpdate',
  RoleArchive = 'RoleArchive',
  MemberCreate = 'MemberCreate',
  MemberUpdate = 'MemberUpdate',
  MemberArchive = 'MemberArchive',
  TaskCreate = 'TaskCreate',
  TaskUpdate = 'TaskUpdate',
  TaskStatusUpdate = 'TaskStatusUpdate',
  TaskArchive = 'TaskArchive',
  DecisionCreate = 'DecisionCreate',
  DecisionUpdate = 'DecisionUpdate',
  DecisionArchive = 'DecisionArchive',
}

export type LogDisplay =
  | {
      type: LogType.CircleCreate | LogType.CircleMove | LogType.CircleCopy
      id: string
      name: string
      parentId: string | null
      parentName: string | null
    }
  | {
      type:
        | LogType.CircleArchive
        | LogType.RoleCreate
        | LogType.RoleUpdate
        | LogType.RoleArchive
        | LogType.MemberCreate
        | LogType.MemberUpdate
        | LogType.MemberArchive
        | LogType.TaskCreate
        | LogType.TaskUpdate
        | LogType.TaskArchive
        | LogType.DecisionCreate
        | LogType.DecisionUpdate
        | LogType.DecisionArchive
      id: string
      name: string
    }
  | {
      type: LogType.CircleMemberAdd | LogType.CircleMemberRemove
      id: string
      name: string
      memberId: string
      memberName: string
    }
  | {
      type: LogType.TaskStatusUpdate
      id: string
      name: string
      status: TaskStatus
    }

export enum EntityChangeType {
  Create = 'Create',
  Update = 'Update',
  Delete = 'Delete',
}

export type EntityChange<Entity> =
  | {
      type: EntityChangeType.Create
      id: string
      data: Entity
    }
  | {
      type: EntityChangeType.Update
      id: string
      prevData: Partial<Entity>
      newData: Partial<Entity>
    }
  | {
      type: EntityChangeType.Delete
      id: string
      data: Entity
    }

export interface EntitiesTypes {
  circles: Circle
  circlesMembers: CircleMember
  roles: Role
  members: Member
  tasks: Task
  decisions: Decision
}

export type EntitiesChanges = {
  [type in keyof EntitiesTypes]?: EntityChange<EntitiesTypes[type]>[]
}

export type EntityMethodGet<Entity> = (
  id: string
) => Promise<WithId<Entity> | undefined>

export type EntityMethodUpdate<Entity> = (
  id: string,
  data: Partial<Entity>
) => Promise<void>

export interface EntityMethods<Entity> {
  get: EntityMethodGet<Entity>
  update: EntityMethodUpdate<Entity>
}

export type EntitiesMethods = {
  [type in keyof EntitiesTypes]: EntityMethods<EntitiesTypes[type]>
}

// Log of changes to the organization
export interface Log {
  orgId: string
  // User and member who made the change
  userId: string
  memberId: string
  memberName: string // Keep name for display, in case of deleted member
  // Meeting during which this log was created (optional)
  meetingId?: string | null
  // Date of log
  createdAt: string
  // Type of log and data to display
  display: LogDisplay
  // Log of changes to entities
  changes: EntitiesChanges
  // Id of canceled log, if it's a cancellation
  cancelLogId?: string | null
  // Member that did the action that's canceled
  cancelMemberId?: string | null
  cancelMemberName?: string | null
  canceled: boolean
}

export type LogEntry = WithId<Log>

// Diff of entity update
export function getEntityChanges<Entity>(
  prevEntity: Entity,
  newEntity: Partial<Entity>
): { prevData: Partial<Entity>; newData: Partial<Entity> } {
  const prevData: Partial<Entity> = {}
  const newData: Partial<Entity> = {}
  for (const key of Object.keys(newEntity) as (keyof Entity)[]) {
    if (prevEntity[key] !== newEntity[key]) {
      if (prevEntity[key] !== undefined) {
        prevData[key] = prevEntity[key]
      }
      if (newEntity[key] !== undefined) {
        newData[key] = newEntity[key]
      }
    }
  }
  return { prevData, newData }
}
