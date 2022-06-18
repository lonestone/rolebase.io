import { Member } from '@shared/model/member'
import { ClaimRole } from '@shared/model/userClaims'
import * as functions from 'firebase-functions'
import { collections } from '../firebase'
import { guardArgument, guardAuth } from '../helpers/guards'
import { setUserClaimOrg } from '../helpers/setUserClaimOrg'
import { generateInviteToken } from './inviteMember'

interface Payload {
  memberId: string
  token: string
}

export const acceptMemberInvitation = functions.https.onCall(
  async (data: Payload, context) => {
    try {
      const { uid } = guardAuth(context)
      guardArgument(data, 'memberId')
      guardArgument(data, 'token')

      // User already member of org?
      const userMemberSnapshot = await collections.members
        .where('userId', '==', uid)
        .get()
      if (userMemberSnapshot.size > 0) {
        throw new functions.https.HttpsError(
          'already-exists',
          'User already member of org'
        )
      }

      // Get member
      const memberRef = collections.members.doc(data.memberId)
      const member = (await memberRef.get()).data()
      if (!member) {
        throw new functions.https.HttpsError('not-found', 'Member not found')
      }
      const role = member.role || ClaimRole.Readonly

      if (member.userId) {
        throw new functions.https.HttpsError(
          'already-exists',
          'Member already attached to a user'
        )
      }

      if (!member.inviteDate) {
        throw new functions.https.HttpsError(
          'permission-denied',
          'Member not invited'
        )
      }

      // Validate token
      const token = generateInviteToken(
        data.memberId,
        member.inviteDate.toDate()
      )
      if (token !== data.token) {
        throw new functions.https.HttpsError(
          'permission-denied',
          'Invalid token'
        )
      }

      // Update member
      await memberRef.update({
        userId: uid,
      } as Member)

      // Update user claims
      await setUserClaimOrg(uid, member.orgId, role)
    } catch (error) {
      console.error(error)
      throw error
    }
  }
)
