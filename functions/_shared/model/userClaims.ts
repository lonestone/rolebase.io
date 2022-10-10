export enum ClaimRole {
  Readonly = 'Readonly',
  Member = 'Member',
  Admin = 'Admin',
}

export function isRoleSufficient(
  role: ClaimRole | string | null | undefined,
  minRole: ClaimRole
): boolean {
  switch (role) {
    case ClaimRole.Admin:
      return true
    case ClaimRole.Member:
      return minRole === ClaimRole.Member || minRole === ClaimRole.Readonly
    case ClaimRole.Readonly:
      return minRole === ClaimRole.Readonly
    default:
      return false
  }
}
