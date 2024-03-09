import { SubscriptionLimits } from '@rolebase/shared/model/subscription'
import { TRPCError } from '@trpc/server'
import { getOrgSubscriptionAndActiveMembers } from './getOrgSubscriptionAndActiveMembers'
import { isSubscriptionActive } from './isSubscriptionActive'

export async function guardSubscriptionAvailableSeat(orgId: string) {
  const { subscription, activeMembers } =
    await getOrgSubscriptionAndActiveMembers(orgId)

  const planMembersLimit = isSubscriptionActive(subscription?.status)
    ? SubscriptionLimits[subscription?.type ?? 'free']
    : SubscriptionLimits['free']

  if (activeMembers >= (planMembersLimit ?? 0)) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'Reached user limit',
    })
  }

  return {
    activeMembers,
    subscription,
  }
}
