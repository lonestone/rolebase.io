import { ClaimRole } from '@shared/model/userClaims'
import { getSeedRoles } from '@shared/seeds/roles'
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
      archived: false,
      name: user.name,
      description: '',
      role: ClaimRole.Admin,
      meetingId: null,
    })

    // Set user claim for org
    await setUserClaim(uid, orgRef.id, ClaimRole.Admin)

    // Create role
    const roleRef = await collections.roles.add({
      orgId: orgRef.id,
      archived: false,
      base: false,
      name: data.name,
      purpose: '',
      domain: '',
      accountabilities: '',
      checklist: '',
      indicators: '',
      notes: '',
      defaultMinPerWeek: null,
      singleMember: false,
      autoCreate: false,
      link: false,
      colorHue: null,
    })

    // Create circle
    await collections.circles.add({
      orgId: orgRef.id,
      roleId: roleRef.id,
      parentId: null,
      members: [],
      archived: false,
    })

    // Create seed roles
    const roles = getSeedRoles(orgRef.id)
    for (const role of roles) {
      await collections.roles.add(role)
    }

    return orgRef.id
  }
)
