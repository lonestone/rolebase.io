import { TRPCError } from '@trpc/server'
import { Subscription_Plan_Type_Enum } from '../gql'
import settings from '../settings'

export const getPlanTypePriceId = (
  planType: Subscription_Plan_Type_Enum
): string => {
  let priceId: string | undefined

  switch (planType) {
    case Subscription_Plan_Type_Enum.Startup:
      priceId = settings.stripe.startupPlanPriceId
      break
    // TODO: define business plan
    case Subscription_Plan_Type_Enum.Business:
    default:
      break
  }

  if (!priceId) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Plan does not exists',
    })
  }

  return priceId
}
