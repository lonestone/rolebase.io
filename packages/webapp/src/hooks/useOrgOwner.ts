import { Member_Role_Enum } from '@gql'
import { useOrgRole } from './useOrgRole'
import useSuperAdmin from './useSuperAdmin'

export default function useOrgOwner(): boolean {
  const userRole = useOrgRole()
  const isOwner = userRole === Member_Role_Enum.Owner
  const isSuperAdmin = useSuperAdmin()
  return isOwner || isSuperAdmin
}
