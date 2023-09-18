import { SubscriptionLimits } from '@shared/model/subscription'
import { isSubscriptionActive } from '@utils/isSubscriptionActive'
import { getOrgSubscriptionAndActiveMembers } from './getOrgSubscriptionAndActiveMembers'
import { RouteError } from './route'

export async function guardSubscriptionAvailableSeat(orgId: string) {
  const { subscription, activeMembers } =
    await getOrgSubscriptionAndActiveMembers(orgId)

  const planMembersLimit = isSubscriptionActive(subscription?.status)
    ? SubscriptionLimits[subscription?.type ?? 'free']
    : SubscriptionLimits['free']

  if (activeMembers >= (planMembersLimit ?? 0)) {
    throw new RouteError(402, 'Reached user limit')
  }

  return {
    activeMembers,
    subscription,
  }
}
