import { Member_Role_Enum } from '@gql'
import { useOrgRole } from './useOrgRole'
import useSuperAdmin from './useSuperAdmin'

export default function useOrgAdmin(): boolean {
  const userRole = useOrgRole()
  const isAdmin = userRole === Member_Role_Enum.Admin
  const isSuperAdmin = useSuperAdmin()
  return isAdmin || isSuperAdmin
}
