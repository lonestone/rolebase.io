import { gql, Subscription_Plan_Type_Enum } from '@gql'
import { validateStripeSubscription } from '@utils/stripe'
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

  if (orgSubscription?.stripeSubscriptionId) {
    await addMemberToStripeSubscription(
      orgSubscription.type,
      orgSubscription.stripeSubscriptionId,
      activeMembers?.length
    )
  } else {
    // Verify that the limit has not been reached
    if (activeMembers.length >= MAX_USERS_FREE_PLAN) {
      throw new RouteError(400, 'Reached user limit for free plan')
    }
  }

  return orgSubscription
}

const addMemberToStripeSubscription = async (
  planType: Subscription_Plan_Type_Enum,
  stripeSubscriptionId: string,
  nbActiveMember: number
) => {
  const stripeSubscription = await validateStripeSubscription(
    stripeSubscriptionId
  )

  if (
    planType === Subscription_Plan_Type_Enum.Startup &&
    nbActiveMember >= MAX_USERS_STARTUP_PLAN
  ) {
    throw new RouteError(400, 'Reached user limit for startup plan')
  }

  // Update the subscription on stripe
  await stripe.subscriptions.update(stripeSubscriptionId, {
    items: [
      {
        id: stripeSubscription.items.data[0].id,
        quantity: nbActiveMember + 1,
      },
    ],
  })
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
      type
    }
  }`)
