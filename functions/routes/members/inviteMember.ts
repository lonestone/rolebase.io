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
import sendMemberActivityEmail from '@utils/sendMemberActivityEmail'
import settings from '@utils/settings'
import { updateMember } from '@utils/updateMember'
import * as yup from 'yup'

const yupSchema = yup.object().shape({
  memberId: yup.string().required(),
  email: emailSchema.required(),
  role: roleSchema.required(),
})

export default route(async (context) => {
  const userId = guardAuth(context)
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
    userId,
  })
  const org = orgAndMemberResult.org_by_pk
  const inviterMember = org?.members[0]
  if (!inviterMember || !inviterMember.user) {
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

  await sendMemberActivityEmail({
    recipients: [
      {
        Email: email,
        Name: member.name,
      },
    ],
    type: 'OrgInvitation',
    lang: inviterMember.user.locale,
    replace: {
      member: inviterMember.name,
      org: org.name,
    },
    picture: inviterMember.picture || '',
    ctaUrl: invitationUrl,
  })
})

const GET_ORG_AND_MEMBER = gql(`
  query getOrgAndMember($orgId: uuid!, $userId: uuid!) {
    org_by_pk(id: $orgId) {
      id
      name
      members(where: { userId: { _eq: $userId } }) {
        id
        name
        picture
        user {
          locale
        }
      }
    }
  }
`)
