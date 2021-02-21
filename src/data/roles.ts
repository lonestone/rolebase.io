export interface Role {
  name: string
  // purpose: string
  // domain: string
  // accountabilities: string
}

export interface RoleEntry extends Role {
  id: string
}

export type RoleCreate = Role
export type RoleUpdate = Partial<Role>
