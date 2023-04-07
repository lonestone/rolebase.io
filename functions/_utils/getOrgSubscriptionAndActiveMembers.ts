import { gql } from '@gql'
import { adminRequest } from '@utils/adminRequest'

export async function getOrgSubscriptionAndActiveMembers(orgId: string) {
  const result = await adminRequest(GET_ORG_SUB_AND_ACTIVE_MEMBERS, {
    orgId,
  })
  const subscription = result.org_by_pk?.org_subscription
  const activeMembers =
    result.org_by_pk?.members_aggregate.aggregate?.count || 0

  return { subscription, activeMembers }
}

const GET_ORG_SUB_AND_ACTIVE_MEMBERS = gql(`
  query getOrgSubscriptionAndActiveMembers($orgId: uuid!) {
    org_by_pk(id: $orgId) {
      org_subscription {
        id
        stripeSubscriptionId
        status
        type
      }
      members_aggregate(where: {
        archived: { _eq: false },
        userId: { _is_null: false }
      }) {
        aggregate {
          count
        }
      }
    }
  }
`)
