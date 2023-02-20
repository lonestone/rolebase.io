import { gql } from '@gql'
import { SubscriptionLimits } from '@shared/model/subscription'
import { getActiveMembersTotal } from '@utils/getActiveMembersTotal'
import { isSubscriptionActive } from '@utils/isSubscriptionActive'
import { adminRequest } from './adminRequest'
import { FunctionContext } from './getContext'
import { RouteError } from './route'

export async function guardOrgSubscriptionPlan(
  context: FunctionContext,
  orgId: string
) {
  if (!context.userId) {
    throw new RouteError(401, 'Unauthorized')
  }

  const nbActiveMembers = await getActiveMembersTotal(context, orgId)
  const orgSubscriptionResponse = await adminRequest(GET_ORG_SUBSCRIPTION, {
    orgId,
  })
  const orgSubscription = orgSubscriptionResponse.org_subscription?.length
    ? orgSubscriptionResponse.org_subscription[0]
    : null

  const planMembersLimit = isSubscriptionActive(orgSubscription?.status)
    ? SubscriptionLimits[orgSubscription?.type ?? 'free']
    : SubscriptionLimits['free']

  if (nbActiveMembers >= (planMembersLimit ?? 0)) {
    throw new RouteError(402, 'Reached user limit for free plan')
  }

  return {
    nbActiveMembers,
    subscription: orgSubscription,
  }
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

export const GET_ORG_SUBSCRIPTION = gql(`
  query getOrgSubscriptionFull($orgId: uuid!) {
    org_subscription(where: {orgId: {_eq: $orgId}}) {
      id
      stripeCustomerId
      stripeSubscriptionId
      type
      status
    }
  }`)
