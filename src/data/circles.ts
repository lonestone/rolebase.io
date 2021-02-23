export interface Circle {
  roleId: string
  parentId: string | null
  members: CircleMemberEntry[]
}

export interface CircleEntry extends Circle {
  id: string
}

export type CircleCreate = Circle
export type CircleUpdate = Partial<Circle>

// Circle member
export interface CircleMember {
  memberId: string
}

export interface CircleMemberEntry extends CircleMember {
  id: string
}
