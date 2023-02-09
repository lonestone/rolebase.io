import { gql } from '@gql'
import { adminRequest } from './adminRequest'
import { FunctionContext } from './getContext'
import { RouteError } from './route'

export async function getActiveMembersTotal(
  context: FunctionContext,
  orgId: string
): Promise<number> {
  if (!context.userId) {
    throw new RouteError(401, 'Unauthorized')
  }

  const org = await adminRequest(GET_ORG_MEMBERS, { orgId })
  const nbActiveMembers = org.org_by_pk!.members.filter(
    (mem) => !!(mem.userId && !mem.archived)
  ).length

  return nbActiveMembers
}

export const GET_ORG_MEMBERS = gql(`
  query getOrgMembersIds($orgId: uuid!) {
    org_by_pk(id: $orgId) {
      id
      members {
        id
        userId
        archived
      }
    }
  }`)
