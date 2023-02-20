import { gql } from '@gql'
import { SubscriptionLimits } from '@shared/model/subscription'
import { guardAuth } from '@utils/guardAuth'
import { isSubscriptionActive } from '@utils/isSubscriptionActive'
import { adminRequest } from './adminRequest'
import { FunctionContext } from './getContext'
import { RouteError } from './route'

export async function guardSubscriptionAvailableSeat(
  context: FunctionContext,
  orgId: string
) {
  guardAuth(context)

  const orgResponse = await adminRequest(GET_ORG_MEMBERS, {
    orgId,
  })
  const org = orgResponse.org_by_pk
  const orgSubscription = orgResponse.org_by_pk?.org_subscription

  const planMembersLimit = isSubscriptionActive(orgSubscription?.status)
    ? SubscriptionLimits[orgSubscription?.type ?? 'free']
    : SubscriptionLimits['free']

  if (!org) throw new RouteError(400, 'Invalid request')

  if (org && org.members.length >= (planMembersLimit ?? 0)) {
    throw new RouteError(402, 'Reached user limit for free plan')
  }

  return {
    nbActiveMembers: org.members.length,
    subscription: orgSubscription,
  }
}

export const GET_ORG_MEMBERS = gql(`
  query getOrg($orgId: uuid!) {
    org_by_pk(id: $orgId) {
      id
      members {
        id
        userId
        archived
      }
      org_subscription {
        id
        stripeCustomerId
        stripeSubscriptionId
        type
        status
      }
    }
  }`)
