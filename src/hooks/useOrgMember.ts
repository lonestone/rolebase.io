import { ClaimRole } from '@shared/model/userClaims'
import { useOrgRole } from './useOrgRole'
import useSuperAdmin from './useSuperAdmin'

export default function useOrgMember(): boolean {
  const userRole = useOrgRole()
  const isMember = userRole === ClaimRole.Member || userRole === ClaimRole.Admin
  const isSuperAdmin = useSuperAdmin()
  return isMember || isSuperAdmin
}
