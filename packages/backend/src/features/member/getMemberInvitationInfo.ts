import { TRPCError } from '@trpc/server'
import * as yup from 'yup'
import { gql } from '../../gql'
import { authedProcedure } from '../../trpc/authedProcedure'
import { adminRequest } from '../../utils/adminRequest'
import { generateInviteToken } from './utils/generateInviteToken'
import { getMemberById } from './utils/getMemberById'

export default authedProcedure
  .input(
    yup.object().shape({
      memberId: yup.string().required(),
      token: yup.string().required(),
    })
  )
  .query(async (opts): Promise<{ orgName: string }> => {
    const { memberId, token } = opts.input

    // Get member
    const member = await getMemberById(memberId)

    if (!member.inviteDate) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Member not invited' })
    }

    // Validate token
    const tokenTruth = generateInviteToken(
      memberId,
      new Date(member.inviteDate)
    )
    if (token !== tokenTruth) {
      throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid token' })
    }

    // Get org name
    const orgResult = await adminRequest(GET_ORG_NAME, {
      orgId: member.orgId,
    })
    const orgName = orgResult.org_by_pk?.name

    if (!orgName) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Organization not found',
      })
    }

    return { orgName }
  })

const GET_ORG_NAME = gql(`
  query getOrgName($orgId: uuid!) {
    org_by_pk(id: $orgId) {
      name
    }
  }
`)
