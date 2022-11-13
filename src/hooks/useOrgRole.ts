import { ClaimRole } from '@shared/model/userClaims'
import useCurrentMember from './useCurrentMember'

export function useOrgRole(): ClaimRole | undefined {
  const currentMember = useCurrentMember()
  return currentMember?.role || undefined
}
