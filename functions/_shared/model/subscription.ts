import { Org_Subscription } from '@gql'
import Stripe from 'stripe'

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
  address?: Stripe.Address | null
}

export type Subscription = {
  card: SubscriptionCard
  upcomingInvoice: UpcomingInvoice | null
  expiresAt: Date | null
  billingDetails: CustomerBillingDetails | null
} & Pick<Org_Subscription, 'status' | 'orgId' | 'type'>
