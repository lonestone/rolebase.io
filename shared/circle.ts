import { RoleEntry } from './role'
import { WithId } from './types'

export interface Circle {
  orgId: string
  roleId: string
  parentId: string | null
  members: CircleMemberEntry[]
}

export type CircleEntry = WithId<Circle>

export interface CircleWithRoleEntry extends CircleEntry {
  role: RoleEntry
}

// Circle member
export interface CircleMember {
  memberId: string
  // Work duration for this member in this circle
  avgMinPerWeek?: number | null
}

export interface CircleMemberEntry extends CircleMember {
  id: string
}
