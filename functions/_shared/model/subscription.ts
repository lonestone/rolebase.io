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

export type Invoice = {
  createdAt: Date
  pdfUrl: string | null | undefined
  totalInCents: number
  status: InvoiceStatus
}
