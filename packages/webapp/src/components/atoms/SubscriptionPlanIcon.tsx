import { Subscription_Plan_Type_Enum } from '@gql'
import React, { useMemo } from 'react'
import {
  SubscriptionPlanBusiness,
  SubscriptionPlanFree,
  SubscriptionPlanStartup,
} from 'src/icons'

type SubscriptionPlanIconProps = {
  type: Subscription_Plan_Type_Enum | null
  size?: number
}

export default function SubscriptionPlanIcon({
  type,
  size,
}: SubscriptionPlanIconProps) {
  const Icon = useMemo(() => {
    switch (type) {
      case Subscription_Plan_Type_Enum.Startup:
        return SubscriptionPlanStartup
      case Subscription_Plan_Type_Enum.Business:
        return SubscriptionPlanBusiness
      default:
        return SubscriptionPlanFree
    }
  }, [type])

  return <Icon size={size} />
}
