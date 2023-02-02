import { Subscription_Plan_Type_Enum } from '@gql'
import React, { useMemo } from 'react'
import { FiBriefcase, FiCoffee, FiGift } from 'react-icons/fi'

type SubscriptionPlanIconProps = {
  type: Subscription_Plan_Type_Enum
}

export default function SubscriptionPlanIcon({
  type,
}: SubscriptionPlanIconProps) {
  const Icon = useMemo(() => {
    switch (type) {
      case Subscription_Plan_Type_Enum.Startup:
        return FiCoffee
      case Subscription_Plan_Type_Enum.Business:
        return FiBriefcase
      default:
        return FiGift
    }
  }, [type])

  return <Icon />
}
