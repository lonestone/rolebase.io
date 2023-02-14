import {
  CircleFragment,
  CircleMemberFragment,
  DecisionFragment,
  MemberFragment,
  RoleFragment,
  TaskFragment,
  Task_Status_Enum,
} from '@gql'

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
      status: Task_Status_Enum
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
  circles: CircleFragment
  circlesMembers: CircleMemberFragment
  roles: RoleFragment
  members: MemberFragment
  tasks: TaskFragment
  decisions: DecisionFragment
}

export type EntitiesChanges = {
  [type in keyof EntitiesTypes]?: EntityChange<EntitiesTypes[type]>[]
}

export type EntityMethodGet<Entity> = (
  id: string
) => Promise<Entity | undefined>

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
