import { ClaimRole } from '@shared/model/userClaims'
import { useOrgRole } from './useOrgRole'
import useSuperAdmin from './useSuperAdmin'

export default function useAdmin(): boolean {
  const userRole = useOrgRole()
  const isAdmin = userRole === ClaimRole.Admin
  const isSuperAdmin = useSuperAdmin()
  return isAdmin || isSuperAdmin
}
