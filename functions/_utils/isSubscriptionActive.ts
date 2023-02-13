import { Subscription_Payment_Status_Enum } from '@gql'

export const isSubscriptionActive = (
  status: Subscription_Payment_Status_Enum
) => {
  return (
    status === Subscription_Payment_Status_Enum.Active ||
    status === Subscription_Payment_Status_Enum.Trialing
  )
}
