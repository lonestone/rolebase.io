import { guardAuth } from '../guards/guardAuth'
import { Context } from '../trpc/context'
import { getOrgSubscriptionAndActiveMembers } from './getOrgSubscriptionAndActiveMembers'
import { isSubscriptionActive } from './isSubscriptionActive'
import { updateStripeSubscription } from './stripe'

export async function updateOrgSubscriptionAfterArchive(
  context: Context,
  orgId: string
) {
  guardAuth(context)

  const { subscription, activeMembers } =
    await getOrgSubscriptionAndActiveMembers(orgId)

  if (subscription && isSubscriptionActive(subscription.status)) {
    await updateStripeSubscription(
      subscription.stripeSubscriptionId!,
      activeMembers - 1
    )
  }

  return orgId
}
