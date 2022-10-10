// https://firebase.google.com/docs/auth/admin/custom-claims

export enum ClaimRole {
  Readonly = 'Readonly',
  Member = 'Member',
  Admin = 'Admin',
}

export interface UserClaims {
  superAdmin?: boolean
  [orgId: `org-${string}`]: ClaimRole
}

export function isRoleSufficient(
  role: ClaimRole | undefined,
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
