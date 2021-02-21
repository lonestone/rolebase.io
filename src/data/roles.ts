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

export function getRoleById(roles: RoleEntry[], id: string) {
  return roles.find((role) => role.id === id) || { id, name: '?' }
}
