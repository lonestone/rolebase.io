import { ClaimRole } from '@shared/userClaims'
import * as functions from 'firebase-functions'
import { collections } from '../firebase'
import { guardArgument, guardAuth } from '../guards'
import { setUserClaim } from '../setUserClaim'
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

      // Check token
      const token = generateInviteToken(
        data.memberId,
        role,
        member.inviteDate.toDate()
      )
      if (token !== data.token) {
        throw new functions.https.HttpsError(
          'permission-denied',
          'Invalid token'
        )
      }

      // Update member
      memberRef.update({
        userId: uid,
      })

      // Update user claims
      await setUserClaim(uid, member.orgId, role)
    } catch (error) {
      console.error(error)
      throw error
    }
  }
)
