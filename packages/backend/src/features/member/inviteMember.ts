import sendMemberActivityEmail from '@rolebase/emails/helpers/sendMemberActivityEmail'
import { emailSchema, roleSchema } from '@rolebase/shared/schemas'
import { TRPCError } from '@trpc/server'
import * as yup from 'yup'
import { Member_Role_Enum, gql } from '../../gql'
import { guardOrg } from '../../guards/guardOrg'
import { guardSubscriptionAvailableSeat } from '../../guards/guardSubscriptionAvailableSeat'
import settings from '../../settings'
import { authedProcedure } from '../../trpc/authedProcedure'
import { adminRequest } from '../../utils/adminRequest'
import { generateInviteToken } from './utils/generateInviteToken'
import { getMemberById } from './utils/getMemberById'
import { updateMember } from './utils/updateMember'

export default authedProcedure
  .input(
    yup.object().shape({
      memberId: yup.string().required(),
      email: emailSchema.required(),
      role: roleSchema.required(),
    })
  )
  .mutation(async (opts): Promise<void> => {
    const { memberId, email, role } = opts.input

    if (!(role in Member_Role_Enum)) {
      throw new TRPCError({ code: 'BAD_REQUEST', message: 'Invalid role' })
    }

    // Get member
    const member = await getMemberById(memberId)

    if (member.userId) {
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'Member already attached to a user',
      })
    }

    // Check and get org
    await guardOrg(member.orgId, Member_Role_Enum.Admin, opts.ctx)

    // Get inviter member
    const orgAndMemberResult = await adminRequest(GET_ORG_AND_MEMBER, {
      orgId: member.orgId,
      userId: opts.ctx.userId!,
    })
    const org = orgAndMemberResult.org_by_pk
    const inviterMember = org?.members[0]
    if (!inviterMember || !inviterMember.user) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Inviter member not found',
      })
    }

    // Verify that the org has not reached it's member limit
    await guardSubscriptionAvailableSeat(member.orgId)

    // Update member
    const inviteDate = new Date()
    await updateMember(member.id, {
      inviteEmail: email,
      inviteDate: inviteDate.toISOString(),
      role: role as Member_Role_Enum,
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
