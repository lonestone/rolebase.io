import { UserClaims } from '@shared/model/userClaims'
import { auth, collections } from '../firebase'

export async function setUserClaim(
  userId: string,
  changedClaims: Partial<UserClaims>
) {
  // Update user claims
  const userRecord = await auth.getUser(userId)
  const claims: UserClaims = {
    ...userRecord.customClaims,
    ...changedClaims,
  }

  // Remove keys that have undefined value
  Object.keys(claims).forEach((key: any) => {
    if (typeof claims[key] === 'undefined') {
      delete claims[key]
    }
  })

  // Save claims
  await auth.setCustomUserClaims(userId, claims)

  // Update user in firestore
  const userRef = collections.users.doc(userId)
  await userRef.update({
    refreshTokenTime: new Date().getTime(),
  })
}
