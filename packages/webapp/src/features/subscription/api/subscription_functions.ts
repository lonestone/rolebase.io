import { fn } from '@/common/api/functions'
import { Subscription_Plan_Type_Enum } from '@gql'
import {
  CustomerBillingDetails,
  Invoice,
  PricePreview,
  PromotionCode,
  Subscription,
  SubscriptionIntentResponse,
} from '@rolebase/shared/model/subscription'
import { Address as StripeAddress } from '@stripe/stripe-js'

export const subscribeOrg = fn<
  {
    orgId: string
    planType: Subscription_Plan_Type_Enum
    address: StripeAddress | null
    promotionCode?: string
  },
  SubscriptionIntentResponse
>('subscriptions/subscribeOrg')

export const unsubscribeOrg = fn<
  {
    orgId: string
  },
  { cancelAt: string }
>('subscriptions/unsubscribeOrg')

export const getSubscriptionInvoices = fn<
  {
    orgId: string
  },
  Invoice[]
>('subscriptions/getSubscriptionInvoices')

export const getSubscription = fn<
  {
    orgId: string
  },
  Subscription
>('subscriptions/getSubscription')

export const updateSubscriptionBillingEmail = fn<
  {
    orgId: string
    email: string
  },
  string
>('subscriptions/updateSubscriptionBillingEmail')

export const updateSubscriptionBillingDetails = fn<
  {
    orgId: string
    billingDetails: CustomerBillingDetails
  },
  string
>('subscriptions/updateSubscriptionBillingDetails')

export const updateSubscriptionPaymentMethodIntent = fn<
  {
    orgId: string
  },
  { clientSecret: string }
>('subscriptions/updateSubscriptionPaymentMethodIntent')

export const resumeSubscription = fn<{
  orgId: string
}>('subscriptions/resumeSubscription')

export const retrieveCouponToSubscription = fn<
  {
    orgId: string
    promotionCode: string
  },
  PromotionCode
>('subscriptions/retrieveCouponToSubscription')

export const getPricePreview = fn<
  {
    orgId: string
    promotionCode?: string
    address: StripeAddress | null
    planType: Subscription_Plan_Type_Enum
  },
  PricePreview
>('subscriptions/getPricePreview')
