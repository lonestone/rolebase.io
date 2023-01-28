import { Org_Subscription_Status_Enum } from '@gql'
import { adminRequest } from './adminRequest'
import { FunctionContext } from './getContext'
import { RouteError } from './route'
import {
  GET_ORG_MEMBERS,
  GET_ORG_SUBSCRIPTION,
} from './updateOrgSubscriptionAfterInvite'

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

export async function updateOrgSubscriptionAfterArchive(
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

  if (isSubscriptionActive(orgSubscription)) {
    // Update the subscription on stripe
    await stripe.subscriptions.update(orgSubscription?.stripeSubscriptionId, {
      items: [
        {
          id: orgSubscription?.stripeSubscriptionItemId,
          quantity: activeMembers.length - 1,
        },
      ],
    })
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
