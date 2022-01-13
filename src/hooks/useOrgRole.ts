import { ClaimRole } from '@shared/userClaims'
import { useStoreState } from '@store/hooks'

export function useOrgRole(): ClaimRole | undefined {
  const orgId = useStoreState((state) => state.orgs.currentId)
  const claims = useStoreState((state) => state.auth.claims)
  return orgId && claims ? claims[`org-${orgId}`] : undefined
}
