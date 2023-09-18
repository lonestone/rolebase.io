import { Member_Role_Enum } from '@gql'
import { useOrgRole } from './useOrgRole'
import useSuperAdmin from './useSuperAdmin'

export default function useOrgMember(): boolean {
  const userRole = useOrgRole()
  const isMember =
    userRole === Member_Role_Enum.Member ||
    userRole === Member_Role_Enum.Admin ||
    userRole === Member_Role_Enum.Owner
  const isSuperAdmin = useSuperAdmin()
  return isMember || isSuperAdmin
}
