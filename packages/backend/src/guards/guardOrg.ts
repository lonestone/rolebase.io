import { isRoleSufficient } from '@rolebase/shared/helpers/isRoleSufficient'
import { TRPCError } from '@trpc/server'
import { gql, Member_Role_Enum } from '../gql'
import { adminRequest } from '../utils/adminRequest'

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
    throw new TRPCError({ code: 'UNAUTHORIZED' })
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
    throw new TRPCError({ code: 'FORBIDDEN' })
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
