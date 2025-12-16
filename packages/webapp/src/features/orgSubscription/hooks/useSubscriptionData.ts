import {
  getSubscriptionSeats,
  isSubscriptionActive,
} from '@rolebase/shared/model/subscription'
import { useStoreState } from '@store/hooks'

export default function useSubscriptionData() {
  const subscription = useStoreState((state) => state.org.subscription)

  const isActive = isSubscriptionActive(subscription?.status)
  const activeMembers =
    useStoreState(
      (state) =>
        state.org.members?.filter((m) => !!m.userId || !!m.inviteEmail).length
    ) || 0
  const subscriptionSeats = getSubscriptionSeats(subscription)
  const availableSeats = Math.max(subscriptionSeats - activeMembers, 0)

  return {
    subscription,
    isActive,
    subscriptionSeats,
    availableSeats,
  }
}
