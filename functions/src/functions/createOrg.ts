import { ClaimRole } from '@shared/userClaims'
import * as functions from 'firebase-functions'
import { collections } from '../firebase'
import { guardArgument, guardAuth } from '../guards'
import { setUserClaim } from '../setUserClaim'

interface Payload {
  name: string
}

// Create org with member, role and circle
// Add claim to user
// Return new org id
export const createOrg = functions.https.onCall(
  async (data: Payload, context) => {
    const { uid } = guardAuth(context)
    guardArgument(data, 'name')

    // Get inviter member
    const userSnapshot = await collections.users.doc(uid).get()
    const user = userSnapshot.data()
    if (!user) {
      throw new functions.https.HttpsError('not-found', 'User not found')
    }

    // Create org
    const orgRef = await collections.orgs.add({
      name: data.name,
      archived: false,
      defaultWorkedMinPerWeek: 35 * 60,
    })

    // Create member
    await collections.members.add({
      orgId: orgRef.id,
      userId: uid,
      name: user.name,
      role: ClaimRole.Admin,
    })

    // Set user claim for org
    await setUserClaim(uid, orgRef.id, ClaimRole.Admin)

    // Create role
    const roleRef = await collections.roles.add({
      orgId: orgRef.id,
      base: false,
      name: data.name,
      purpose: '',
      domain: '',
      accountabilities: '',
      notes: '',
    })

    // Create circle
    await collections.circles.add({
      orgId: orgRef.id,
      roleId: roleRef.id,
      parentId: null,
      members: [],
    })

    return orgRef.id
  }
)
