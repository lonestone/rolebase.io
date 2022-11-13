import { gql } from '@gql'
import { adminRequest } from '@utils/adminRequest'
import { generateInviteToken } from '@utils/generateInviteToken'
import { getMemberById } from '@utils/getMemberById'
import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { route, RouteError } from '@utils/route'
import { updateMember } from '@utils/updateMember'
import * as yup from 'yup'

const yupSchema = yup.object().shape({
  memberId: yup.string().required(),
  token: yup.string().required(),
})

export default route(async (context): Promise<void> => {
  guardAuth(context)
  const { memberId, token } = guardBodyParams(context, yupSchema)

  // Get member
  const member = await getMemberById(memberId)

  // Check if user is already a member of the org
  const checkUserResult = await adminRequest(CHECK_ORG_USER, {
    orgId: member.orgId,
    userId: context.userId,
  })
  if (checkUserResult.org_by_pk?.members[0]) {
    throw new RouteError(409, 'User is already a member of the org')
  }

  if (member.userId) {
    throw new RouteError(409, 'Member already attached to a user')
  }

  if (!member.inviteDate) {
    throw new RouteError(401, 'Member not invited')
  }

  // Validate token
  const tokenTruth = generateInviteToken(memberId, new Date(member.inviteDate))
  if (token !== tokenTruth) {
    throw new RouteError(401, 'Invalid token')
  }

  // Update member
  await updateMember(memberId, { userId: context.userId })
})

const CHECK_ORG_USER = gql(`
  query checkOrgUser($orgId: uuid!, $userId: uuid!) {
    org_by_pk(id: $orgId) {
      members(where: { userId: { _eq: $userId } }) {
        id
      }
    }
  }
`)
