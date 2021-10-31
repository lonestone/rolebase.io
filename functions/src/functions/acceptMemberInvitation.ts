import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import { collections } from '../firebase'
import { guardArgument, guardAuth } from '../guards'
import { generateInviteToken } from '../utils'

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

      // Get org
      const orgId = member.orgId
      const orgRef = collections.orgs.doc(orgId)
      const org = (await orgRef.get()).data()
      if (!org) {
        throw new functions.https.HttpsError('not-found', 'Org not found')
      }

      if (org.ownersIds.includes(uid)) {
        throw new functions.https.HttpsError(
          'already-exists',
          'User already in organization'
        )
      }

      // Check token
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
      memberRef.update({
        userId: uid,
      })

      // Update org
      orgRef.update({
        ownersIds: admin.firestore.FieldValue.arrayUnion(uid),
      })
    } catch (error) {
      console.error(error)
      throw error
    }
  }
)
