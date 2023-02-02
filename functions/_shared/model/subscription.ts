import { Org_Subscription } from '@gql'

export type SubscriptionIntentResponse = {
  subscriptionId: string
  clientSecret: string
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

export type Subscription = {
  card: SubscriptionCard
  upcomingInvoice: UpcomingInvoice | null
  email: string | null
} & Pick<Org_Subscription, 'status' | 'orgId' | 'type'>
