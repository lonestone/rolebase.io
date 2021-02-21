export interface Circle {
  roleId: string
  parentId: string | null
  membersIds: string[]
}

export interface CircleEntry extends Circle {
  id: string
}

export type CircleCreate = Circle
export type CircleUpdate = Partial<Circle>
