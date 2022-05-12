import { ClaimRole } from '@shared/model/userClaims'
import { useStoreState } from '@store/hooks'
import { useOrgId } from './useOrgId'

export function useOrgRole(): ClaimRole | undefined {
  const orgId = useOrgId()
  const claims = useStoreState((state) => state.auth.claims)
  return orgId && claims ? claims[`org-${orgId}`] : undefined
}
