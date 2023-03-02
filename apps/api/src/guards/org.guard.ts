import { FunctionContext } from "@utils/getContext";
import { RouteError } from "@utils/route";
import { gql } from "graphql-request";
import { graphqlClient } from "src/graphql/client";
import { Member_Role_Enum } from "src/graphql/types";
import { isRoleSufficient } from "src/helpers/isRoleSufficient";

export async function OrgGuard(
  context: FunctionContext,
  orgId: string,
  minRole: Member_Role_Enum
) {
  if (!context.userId) {
    throw new RouteError(401, "Unauthorized");
  }

  // Get user role in org
  const result = await graphqlClient.getOrgRole({
    orgId,
    userId: context.userId,
  })

  // Check if role is sufficient
  const org = result.org_by_pk;
  const role = org?.members[0]?.role;
  if (!org || !isRoleSufficient(role, minRole)) {
    throw new RouteError(403, "Forbidden");
  }

  return org;
}

const GET_ORG_ROLE = gql`
  query getOrgRole($orgId: uuid!, $userId: uuid!) {
    org_by_pk(id: $orgId) {
      id
      name
      members(where: { userId: { _eq: $userId } }) {
        role
      }
    }
  }
`;
