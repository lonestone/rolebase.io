import { RoleEntry } from './roles'

export interface Circle {
  orgId: string
  roleId: string
  parentId: string | null
  members: CircleMemberEntry[]
}

export type CircleEntry = Circle & { id: string }
export type CircleCreate = Circle
export type CircleUpdate = Partial<Circle>

export interface CircleWithRoleEntry extends CircleEntry {
  role?: RoleEntry
}

// Circle member
export interface CircleMember {
  memberId: string
  avgMinPerWeek?: number | null
}

export interface CircleMemberEntry extends CircleMember {
  id: string
}
