import { Member_Role_Enum } from '@gql'
import useSuperAdmin from '../../user/hooks/useSuperAdmin'
import { useOrgRole } from './useOrgRole'

export default function useOrgOwner(): boolean {
  const userRole = useOrgRole()
  const isOwner = userRole === Member_Role_Enum.Owner
  const isSuperAdmin = useSuperAdmin()
  return !!userRole && (isOwner || isSuperAdmin)
}
