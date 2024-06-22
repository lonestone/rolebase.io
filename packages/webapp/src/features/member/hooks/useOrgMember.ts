import { Member_Role_Enum } from '@gql'
import useSuperAdmin from '../../user/hooks/useSuperAdmin'
import { useOrgRole } from './useOrgRole'

export default function useOrgMember(): boolean {
  const userRole = useOrgRole()
  const isMember =
    userRole === Member_Role_Enum.Member ||
    userRole === Member_Role_Enum.Admin ||
    userRole === Member_Role_Enum.Owner
  const isSuperAdmin = useSuperAdmin()
  return !!userRole && (isMember || isSuperAdmin)
}
