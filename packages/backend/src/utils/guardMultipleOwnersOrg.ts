import { TRPCError } from '@trpc/server'
import { Context } from '../../src/context'
import { gql } from '../gql'
import { adminRequest } from './adminRequest'

export async function guardMultipleOwnersOrg(context: Context, orgId: string) {
  if (!context.userId) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  const org = await adminRequest(GET_ORG_MEMBERS, { orgId })
  const owners = org.org_by_pk?.members ?? []

  // Checks if at least 1 owner will remain in the org
  if (owners.length <= 1) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Org must have at least 1 owner',
    })
  }

  return org
}

const GET_ORG_MEMBERS = gql(`
  query getOrgMembers($orgId: uuid!) {
    org_by_pk(id: $orgId) {
    id
    members(where: {role: {_eq: Owner}}) {
      id
    }
  }
}`)
