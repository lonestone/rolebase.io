import { gql, Member_Role_Enum } from '@gql'
import { isRoleSufficient } from '@shared/helpers/isRoleSufficient'
import { adminRequest } from './adminRequest'
import { FunctionContext } from './getContext'
import { RouteError } from './route'

export async function guardOrg(
  context: Partial<FunctionContext>,
  orgId: string,
  minRole: Member_Role_Enum
) {
  if (!context.userId) {
    throw new RouteError(401, 'Unauthorized')
  }

  // Get user role in org
  const result = await adminRequest(GET_ORG_ROLE, {
    orgId,
    userId: context.userId,
  })

  // Check if role is sufficient
  const org = result.org_by_pk
  const role = org?.members[0]?.role
  if (!org || !isRoleSufficient(role, minRole)) {
    throw new RouteError(403, 'Forbidden')
  }

  return { org, member: org?.members[0] }
}

const GET_ORG_ROLE = gql(`
  query getOrgRole($orgId: uuid!, $userId: uuid!) {
    org_by_pk(id: $orgId) {
      id
      name
      members(where: {userId: {_eq: $userId}}) {
        id
        role
        userId
      }
    }
  }`)
