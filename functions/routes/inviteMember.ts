import { gql, Member_Role_Enum } from '@gql'
import { emailSchema, roleSchema } from '@shared/schemas'
import { adminRequest } from '@utils/adminRequest'
import { generateInviteToken } from '@utils/generateInviteToken'
import { getMemberById } from '@utils/getMemberById'
import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { guardOrg } from '@utils/guardOrg'
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
  const org = await guardOrg(context, member.orgId, Member_Role_Enum.Admin)

  // Get inviter member
  const inviterMemberResult = await adminRequest(GET_MEMBER_BY_USER_ID, {
    orgId: member.orgId,
    userId: context.userId,
  })
  const inviterMember = inviterMemberResult.member[0]
  if (!inviterMember) {
    throw new RouteError(404, 'Inviter member not found')
  }

  // Update member
  const inviteDate = new Date()
  await updateMember(member.id, {
    inviteEmail: email,
    inviteDate,
    role,
  })

  const token = generateInviteToken(memberId, inviteDate)
  const invitationUrl = `${settings.url}/orgs/${org.id}/invitation?memberId=${memberId}&token=${token}`
  console.log('Invitation url:', invitationUrl)

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

const GET_MEMBER_BY_USER_ID = gql(`
  query getMemberByUserId($orgId: uuid!, $userId: uuid!) {
    member(where: { orgId: { _eq: $orgId }, userId: { _eq: $userId } }) {
      id
      name
    }
  }
`)
