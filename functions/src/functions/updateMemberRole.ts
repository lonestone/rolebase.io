import { ClaimRole } from '@shared/userClaims'
import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import { collections } from '../firebase'
import { guardArgument, guardAuth, guardOrg } from '../guards'
import { setUserClaim } from '../setUserClaim'

interface Payload {
  memberId: string
  role?: ClaimRole
}

export const updateMemberRole = functions.https.onCall(
  async (data: Payload, context) => {
    try {
      guardAuth(context)
      guardArgument(data, 'memberId')

      // Get member
      const memberRef = collections.members.doc(data.memberId)
      const member = (await memberRef.get()).data()
      if (!member) {
        throw new functions.https.HttpsError('not-found', 'Member not found')
      }

      await guardOrg(context, member.orgId, ClaimRole.Admin)

      if (!member.role) {
        throw new functions.https.HttpsError(
          'permission-denied',
          'Member not invited'
        )
      }

      if (!data.role) {
        // Remove role
        memberRef.update({
          userId: admin.firestore.FieldValue.delete(),
          role: admin.firestore.FieldValue.delete(),
          inviteDate: admin.firestore.FieldValue.delete(),
          inviteEmail: admin.firestore.FieldValue.delete(),
        })
        if (member.userId) {
          await setUserClaim(member.userId, member.orgId, undefined)
        }
      } else if (data.role in ClaimRole) {
        // Update role
        memberRef.update({
          role: data.role,
        })
        if (member.userId) {
          await setUserClaim(member.userId, member.orgId, data.role)
        }
      } else {
        throw new functions.https.HttpsError('invalid-argument', 'Invalid role')
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }
)
