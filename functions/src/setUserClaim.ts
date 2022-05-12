import { ClaimRole } from '@shared/model/userClaims'
import { auth, collections } from './firebase'

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

  // Update user in firestore
  const userRef = collections.users.doc(userId)
  await userRef.update({
    refreshTokenTime: new Date().getTime(),
  })
}
