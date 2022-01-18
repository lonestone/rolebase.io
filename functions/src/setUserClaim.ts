import { ClaimRole } from '@shared/userClaims'
import { auth } from './firebase'

export async function setUserClaim(
  userId: string,
  orgId: string,
  role: ClaimRole | undefined
) {
  // Update user claims
  const userRecord = await auth.getUser(userId)
  const claims = { ...userRecord.customClaims }

  // Remove role claim
  if (!role) {
    delete claims[`org-${orgId}`]
  }

  // Add role claim
  if (role) {
    claims[`org-${orgId}`] = role
  }

  // Save claims
  await auth.setCustomUserClaims(userId, claims)
}
