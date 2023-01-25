import { gql, Member_Role_Enum } from '@gql'
import { adminRequest } from './adminRequest'
import { FunctionContext } from './getContext'
import { RouteError } from './route'

export async function guardOrgOwnership(
  context: FunctionContext,
  orgId: string
) {
  if (!context.userId) {
    throw new RouteError(401, 'Unauthorized')
  }

  const org = await adminRequest(GET_ORG_MEMBERS, { orgId })
  const owners = org.org_by_pk!.members.filter(
    (mem) => mem.role === Member_Role_Enum.Owner
  )

  // Checks if at least 1 owner will remain in the org
  if (owners.length <= 1) {
    throw new RouteError(400, 'Org must have at least 1 owner')
  }

  return org
}

const GET_ORG_MEMBERS = gql(`
  query getOrg($orgId: uuid!) {
    org_by_pk(id: $orgId) {
      id
      members {
        role
      }
    }
  }`)
