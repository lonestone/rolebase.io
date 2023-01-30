import { Org_Subscription_Status_Enum, gql } from '@gql'
import { adminRequest } from './adminRequest'
import { FunctionContext } from './getContext'
import { RouteError } from './route'

// Maybe store it inside the database but is it really worth it (Adds another request) ?
const MAX_USERS_FREE_PLAN = 5
const MAX_USERS_STARTUP_PLAN = 200

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

export async function updateOrgSubscriptionAfterInvite(
  context: FunctionContext,
  orgId: string
) {
  if (!context.userId) {
    throw new RouteError(401, 'Unauthorized')
  }

  const org = await adminRequest(GET_ORG_MEMBERS, { orgId })
  const activeMembers = org.org_by_pk!.members.filter((mem) => !!mem.userId)
  const orgSubscriptionResponse = await adminRequest(GET_ORG_SUBSCRIPTION, {
    orgId,
  })
  const orgSubscription = orgSubscriptionResponse.org_subscription?.length
    ? orgSubscriptionResponse.org_subscription[0]
    : null

  const stripeSubscriptionItemId = '' // Get this from stripe

  if (isSubscriptionActive(orgSubscription)) {
    // Verify that the limit has not been reached
    if (activeMembers.length >= MAX_USERS_STARTUP_PLAN) {
      throw new RouteError(400, 'Reached user limit for startup plan')
    }
    // Update the subscription on stripe
    await stripe.subscriptions.update(orgSubscription?.stripeSubscriptionId, {
      items: [
        {
          id: stripeSubscriptionItemId,
          quantity: activeMembers.length + 1,
        },
      ],
    })
  } else {
    // Verify that the limit has not been reached
    if (activeMembers.length >= MAX_USERS_FREE_PLAN) {
      throw new RouteError(400, 'Reached user limit for free plan')
    }
  }

  return orgSubscription
}

const isSubscriptionActive = (orgSubscription) => {
  return (
    orgSubscription &&
    orgSubscription.status !== Org_Subscription_Status_Enum.Inactive &&
    orgSubscription.stripeSubscriptionId
  )
}

export const GET_ORG_MEMBERS = gql(`
  query getOrgMembersIds($orgId: uuid!) {
    org_by_pk(id: $orgId) {
      id
      members {
        id
        userId
      }
    }
  }`)

export const GET_ORG_SUBSCRIPTION = gql(`
  query getOrgSubscriptionFull($orgId: uuid!) {
    org_subscription(where: {orgId: {_eq: $orgId}}) {
      id
      stripeCustomerId
      stripeSubscriptionId
    }
  }`)
