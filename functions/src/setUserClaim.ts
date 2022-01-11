import { ClaimRole } from '@shared/userClaims'
import { auth } from './firebase'

export async function setUserClaim(
  userId: string,
  orgId: string,
  role: ClaimRole
) {
  // Update user claims
  const userRecord = await auth.getUser(userId)
  const claims = {
    ...userRecord.customClaims,
    [orgId]: role,
  }
  auth.setCustomUserClaims(userId, claims)
}
