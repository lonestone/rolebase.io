import { Org_Subscription, Subscription_Plan_Type_Enum } from '@gql'
import Stripe from 'stripe'

export const SubscriptionLimits: {
  [key in Subscription_Plan_Type_Enum | 'free']?: number
} = {
  free: 5,
  [Subscription_Plan_Type_Enum.Startup]: 200,
  [Subscription_Plan_Type_Enum.Business]: Infinity,
}

export type SubscriptionIntentResponse = {
  subscriptionId: string
  clientSecret: string
  price: {
    quantity: number
    totalPerSeatInCents: number
  }
}

export enum InvoiceStatus {
  PAID = 'paid',
  DRAF = 'draft',
  OPEN = 'open',
  UNCOLLECTIBLE = 'uncollectible',
  VOID = 'void',
}

export type UpcomingInvoice = {
  nextPayment: Date
  totalInCents: number
}

export type Invoice = {
  createdAt: Date
  pdfUrl: string | null | undefined
  totalInCents: number
  status: InvoiceStatus
}

export type SubscriptionCard = {
  expMonth: number
  expYear: number
  brand: string
  last4: string
}

export type CustomerBillingDetails = {
  name?: string | null | undefined
  email?: string | null | undefined
  address?: Stripe.Address | null | undefined
}

export type Subscription = {
  card: SubscriptionCard | null
  upcomingInvoice: UpcomingInvoice | null
  expiresAt: Date | null
  billingDetails: CustomerBillingDetails | null
} & Pick<Org_Subscription, 'status' | 'orgId' | 'type'>

export type PromotionCode = {
  id: string
  restrictions: Stripe.PromotionCode.Restrictions
  name: string
  amountOff: number | null
  percentOff: number | null
}
