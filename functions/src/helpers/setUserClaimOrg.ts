import { ClaimRole } from '@shared/model/userClaims'
import { setUserClaim } from './setUserClaim'

export async function setUserClaimOrg(
  userId: string,
  orgId: string,
  role: ClaimRole | undefined
) {
  await setUserClaim(userId, {
    [`org-${orgId}`]: role,
  })
}
