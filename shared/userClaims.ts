// https://firebase.google.com/docs/auth/admin/custom-claims

export enum ClaimRole {
  Readonly = 'Readonly',
  Member = 'Member',
  Admin = 'Admin',
}

export interface UserClaims {
  [orgId: `org-${string}`]: ClaimRole
}
