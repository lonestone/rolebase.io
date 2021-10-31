import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as mailjet from 'node-mailjet'
import { collections, config } from '../firebase'
import { guardArgument, guardAuth } from '../guards'
import settings from '../settings'
import { generateInviteToken } from '../utils'

interface Payload {
  memberId: string
  email: string
}

const mailjetClient = mailjet.connect(
  config.mailjet.public,
  config.mailjet.private
)

export const inviteMember = functions.https.onCall(
  async (data: Payload, context) => {
    const { uid } = guardAuth(context)
    guardArgument(data, 'email')
    guardArgument(data, 'memberId')

    // Get member
    const memberRef = collections.members.doc(data.memberId)
    const memberSnapshot = await memberRef.get()
    const member = memberSnapshot.data()
    if (!member) {
      throw new functions.https.HttpsError('not-found', 'Member not found')
    }

    // Get inviter member
    const inviterSnapshot = await collections.users.doc(uid).get()
    const inviter = inviterSnapshot.data()
    if (!inviter) {
      throw new functions.https.HttpsError(
        'not-found',
        'Inviter Member not found'
      )
    }

    // Get org
    const orgId = member.orgId
    const orgRef = collections.orgs.doc(orgId)
    const orgSnapshot = await orgRef.get()
    const org = orgSnapshot.data()
    if (!org) {
      throw new functions.https.HttpsError('not-found', 'Org not found')
    }

    // Update member
    const inviteDate = new Date()
    memberRef.update({
      inviteEmail: data.email,
      inviteDate: admin.firestore.Timestamp.fromDate(inviteDate),
    })

    const token = generateInviteToken(data.memberId, inviteDate)
    const invitationUrl = `${settings.url}/orgs/${orgId}/invitation?memberId=${data.memberId}&token=${token}`

    try {
      // https://app.mailjet.com/template/3285393/build
      await mailjetClient.post('send', { version: 'v3.1' }).request({
        Messages: [
          {
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
              inviterName: inviter.name,
              invitationUrl,
            },
          },
        ],
      })
    } catch (error) {
      throw new functions.https.HttpsError(
        'unavailable',
        (error as Error).message
      )
    }
  }
)
