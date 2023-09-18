import { Subscription_Plan_Type_Enum } from '@gql'
import { ReactElement } from 'react'

export type SubscriptionPlan = {
  type: Subscription_Plan_Type_Enum | null
  title: string
  desc: string
  features: string[]
  color: string
}

export type SubscriptionPlanData = {
  free: SubscriptionPlan
  startup: SubscriptionPlan
  business: SubscriptionPlan
}

export type SubscriptionPlanCardData = {
  footer: ReactElement
} & SubscriptionPlan
