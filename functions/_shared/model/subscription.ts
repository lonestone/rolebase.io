export enum SubscriptionPlanType {
  FREE = 'Free',
  STARTUP = 'Startup',
  ENTERPRISE = 'Enterprise',
}

export type SubscriptionIntentResponse = {
  subscriptionId: string
  clientSecret: string
}
