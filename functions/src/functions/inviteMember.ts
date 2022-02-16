import { ClaimRole } from '@shared/userClaims'
import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import { collections } from '../firebase'
import { guardArgument, guardAuth, guardOrg } from '../guards'
import { sendMailjetEmail } from '../mailjet'
import settings from '../settings'
import { md5 } from '../utils'

interface Payload {
  memberId: string
  email: string
  role: ClaimRole
}

export function generateInviteToken(memberId: string, inviteDate: Date) {
  return md5(
    memberId + inviteDate.toISOString() + settings.security.invitation_token
  )
}

export const inviteMember = functions.https.onCall(
  async (data: Payload, context) => {
    const { uid } = guardAuth(context)
    guardArgument(data, 'email')
    guardArgument(data, 'memberId')
    guardArgument(data, 'role')

    // Get member
    const memberRef = collections.members.doc(data.memberId)
    const memberSnapshot = await memberRef.get()
    const member = memberSnapshot.data()
    if (!member) {
      throw new functions.https.HttpsError('not-found', 'Member not found')
    }

    const orgId = member.orgId
    await guardOrg(context, orgId, ClaimRole.Admin)

    // Get org
    const orgSnapshot = await collections.orgs.doc(orgId).get()
    const org = orgSnapshot.data()
    if (!org) {
      throw new functions.https.HttpsError('not-found', 'Org not found')
    }

    // Get inviter member
    const inviterSnapshot = await collections.members
      .where('orgId', '==', orgId)
      .where('userId', '==', uid)
      .get()
    const inviterMember = inviterSnapshot.docs[0]?.data()
    if (!inviterMember) {
      throw new functions.https.HttpsError(
        'not-found',
        'Inviter Member not found'
      )
    }

    // Update member
    const inviteDate = new Date()
    await memberRef.update({
      role: data.role,
      inviteEmail: data.email,
      inviteDate: admin.firestore.Timestamp.fromDate(inviteDate),
    })

    const token = generateInviteToken(data.memberId, inviteDate)
    const invitationUrl = `${settings.url}/orgs/${orgId}/invitation?memberId=${data.memberId}&token=${token}`

    try {
      // https://app.mailjet.com/template/3285393/build
      await sendMailjetEmail({
        From: {
          Email: settings.mail.sender.email,
          Name: settings.mail.sender.name,
        },
        To: [
          {
            Email: data.email,
            Name: member.name,
          },
        ],
        TemplateID: 3285393,
        TemplateLanguage: true,
        Subject: `Invitation dans l'organisation ${org.name}`,
        Variables: {
          orgName: org.name,
          inviterName: inviterMember.name,
          invitationUrl,
        },
      })
    } catch (error) {
      throw new functions.https.HttpsError(
        'unavailable',
        (error as Error).message
      )
    }
  }
)
