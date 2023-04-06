import { gql, Member_Role_Enum } from '@gql'
import { emailSchema, roleSchema } from '@shared/schemas'
import { adminRequest } from '@utils/adminRequest'
import { generateInviteToken } from '@utils/generateInviteToken'
import { getMemberById } from '@utils/getMemberById'
import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { guardOrg } from '@utils/guardOrg'
import { guardSubscriptionAvailableSeat } from '@utils/guardSubscriptionAvailableSeat'
import { route, RouteError } from '@utils/route'
import { sendMailjetEmail } from '@utils/sendMailjetEmail'
import settings from '@utils/settings'
import { updateMember } from '@utils/updateMember'
import * as yup from 'yup'

const yupSchema = yup.object().shape({
  memberId: yup.string().required(),
  email: emailSchema.required(),
  role: roleSchema.required(),
})

export default route(async (context) => {
  guardAuth(context)
  const { memberId, email, role } = guardBodyParams(context, yupSchema)

  // Get member
  const member = await getMemberById(memberId)

  if (member.userId) {
    throw new RouteError(409, 'Member already attached to a user')
  }

  // Check and get org
  await guardOrg(member.orgId, Member_Role_Enum.Admin, context)

  // Get inviter member
  const orgAndMemberResult = await adminRequest(GET_ORG_AND_MEMBER, {
    orgId: member.orgId,
    userId: context.userId,
  })
  const org = orgAndMemberResult.org_by_pk
  const inviterMember = org?.members[0]
  if (!inviterMember) {
    throw new RouteError(404, 'Inviter member not found')
  }

  // Verify that the org has not reached it's member limit
  await guardSubscriptionAvailableSeat(member.orgId)

  // Update member
  const inviteDate = new Date()
  await updateMember(member.id, {
    inviteEmail: email,
    inviteDate,
    role,
  })

  const token = generateInviteToken(memberId, inviteDate)
  const invitationUrl = `${settings.url}/orgs/${org.id}/invitation?memberId=${memberId}&token=${token}`

  try {
    // https://app.mailjet.com/template/3285393/build
    await sendMailjetEmail({
      From: {
        Email: settings.mail.sender.email,
        Name: settings.mail.sender.name,
      },
      To: [
        {
          Email: email,
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
    console.error('Error sending invitation email', error)
  }
})

const GET_ORG_AND_MEMBER = gql(`
  query getOrgAndMember($orgId: uuid!, $userId: uuid!) {
    org_by_pk(id: $orgId) {
      id
      name
      members(where: { userId: { _eq: $userId } }) {
        id
        name
      }
    }
  }
`)
