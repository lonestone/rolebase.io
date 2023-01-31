import { validateStripeSubscription } from '@utils/stripe'
import { adminRequest } from './adminRequest'
import { FunctionContext } from './getContext'
import { RouteError } from './route'
import {
  GET_ORG_MEMBERS,
  GET_ORG_SUBSCRIPTION
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

  if (orgSubscription) {
    // Update the subscription on stripe
    await removeMemberFromStripeSubscription(
      orgSubscription.stripeSubscriptionId,
      activeMembers.length
    )
  }

  return orgSubscription
}

const removeMemberFromStripeSubscription = async (
  stripeSubscriptionId: string,
  nbActiveMember: number
) => {
  const stripeSubscription = await validateStripeSubscription(
    stripeSubscriptionId
  )

  // Update the subscription on stripe
  await stripe.subscriptions.update(stripeSubscriptionId, {
    items: [
      {
        id: stripeSubscription.items.data[0].id,
        quantity: nbActiveMember - 1,
      },
    ],
  })
}
