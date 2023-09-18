import { Subscription_Plan_Type_Enum } from '@gql'
import { RouteError } from '@utils/route'

export const getPlanTypePriceId = (
  planType: Subscription_Plan_Type_Enum
): string => {
  let priceId: string | undefined

  switch (planType) {
    case Subscription_Plan_Type_Enum.Startup:
      priceId = process.env.STRIPE_STARTUP_PLAN_PRICE_ID
      break
    // TODO: define business plan
    case Subscription_Plan_Type_Enum.Business:
    default:
      break
  }

  if (!priceId) {
    throw new RouteError(400, 'Plan does not exists')
  }

  return priceId
}
