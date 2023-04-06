import { guardAuth } from '@utils/guardAuth'
import { isSubscriptionActive } from '@utils/isSubscriptionActive'
import { updateStripeSubscription } from '@utils/stripe'
import { FunctionContext } from './getContext'
import { getOrgSubscriptionAndActiveMembers } from './getOrgSubscriptionAndActiveMembers'

export async function updateOrgSubscriptionAfterArchive(
  context: FunctionContext,
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
