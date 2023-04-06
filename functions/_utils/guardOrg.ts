import { gql, Member_Role_Enum } from '@gql'
import { isRoleSufficient } from '@shared/helpers/isRoleSufficient'
import { adminRequest } from './adminRequest'
import { RouteError } from './route'

export async function guardOrg(
  orgId: string,
  minRole: Member_Role_Enum,
  context: { userId?: string; isAdmin?: boolean }
): Promise<void> {
  // Allow Hasura admins to bypass
  if (context.isAdmin) {
    return
  }

  if (!context.userId) {
    throw new RouteError(401, 'Unauthorized')
  }

  // Get user role in org
  const result = await adminRequest(GET_USER_ROLE_IN_ORG, {
    orgId,
    userId: context.userId,
  })

  // Check if role is sufficient
  const org = result.org_by_pk
  const role = org?.members[0]?.role
  if (!org || !isRoleSufficient(role, minRole)) {
    throw new RouteError(403, 'Forbidden')
  }
}

const GET_USER_ROLE_IN_ORG = gql(`
  query getUserRoleInOrg($orgId: uuid!, $userId: uuid!) {
    org_by_pk(id: $orgId) {
      members(where: {userId: {_eq: $userId}}) {
        role
      }
    }
  }`)
