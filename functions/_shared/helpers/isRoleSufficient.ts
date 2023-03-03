import { Member_Role_Enum } from '@gql'

export function isRoleSufficient(
  role: Member_Role_Enum | string | null | undefined,
  minRole: Member_Role_Enum
): boolean {
  switch (role) {
    case Member_Role_Enum.Owner:
      return true
    case Member_Role_Enum.Admin:
      return (
        minRole === Member_Role_Enum.Admin ||
        minRole === Member_Role_Enum.Member ||
        minRole === Member_Role_Enum.Readonly
      )
    case Member_Role_Enum.Member:
      return (
        minRole === Member_Role_Enum.Member ||
        minRole === Member_Role_Enum.Readonly
      )
    case Member_Role_Enum.Readonly:
      return minRole === Member_Role_Enum.Readonly
    default:
      return false
  }
}
