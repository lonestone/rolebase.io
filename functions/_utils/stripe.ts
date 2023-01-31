import { RouteError } from '@utils/route'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY ?? '', {
  apiVersion: '2022-11-15',
})

type StripeSubscriptionCreation = Stripe.Subscription & {
  latest_invoice: Stripe.Invoice & {
    payment_intent: Stripe.PaymentIntent
  }
}

export const createStripeCustomer = async (
  email: string,
  name: string
): Promise<Stripe.Customer> => {
  try {
    return stripe.customers.create({
      email,
      name,
    })
  } catch (e) {
    console.error(`[STRIPE ERROR]: ${e.message}`)
    throw new RouteError(500, 'Could not create customer')
  }
}

export const getStripeCustomerFromCustomerId = async (
  stripeCustomerId: string
): Promise<Stripe.Customer | Stripe.DeletedCustomer> => {
  try {
    return stripe.customers.retrieve(stripeCustomerId)
  } catch (e) {
    console.error(`[STRIPE ERROR]: ${e.message}`)
    throw new RouteError(500, 'Could not retrieve customer')
  }
}

export const getStripeSubscriptionFromSubscriptionId = async (
  stripeSubscriptionId: string
): Promise<Stripe.Subscription> => {
  try {
    return stripe.subscriptions.retrieve(stripeSubscriptionId)
  } catch (e) {
    console.error(`[STRIPE ERROR]: ${e.message}`)
    throw new RouteError(500, 'Could not retrieve subscription')
  }
}

export const validateStripeSubscription = async (
  stripeSubscriptionId: string
) => {
  const stripeSubscription = await getStripeSubscriptionFromSubscriptionId(
    stripeSubscriptionId
  )

  if (!stripeSubscription) throw new RouteError(400, 'No subscription')

  // Subscription has been canceled, we consider it as locked
  if (stripeSubscription.cancel_at)
    throw new RouteError(400, 'Subscription has been canceled')

  return stripeSubscription
}

export const cancelStripeSubscription = async (
  stripeSubscriptionId: string
) => {
  try {
    return stripe.subscriptions.update(stripeSubscriptionId, {
      cancel_at_period_end: true,
    })
  } catch (e) {
    console.error(`[STRIPE ERROR]: ${e.message}`)
    throw new RouteError(500, 'Could not cancel subscription')
  }
}

export const getStripeSubscriptionInvoices = async (
  stripeCustomerId: string,
  stripeSubscriptionId: string
): Promise<Stripe.ApiList<Stripe.Invoice>> => {
  try {
    return stripe.invoices.list({
      customer: stripeCustomerId,
      subscription: stripeSubscriptionId,
    })
  } catch (e) {
    console.error(`[STRIPE ERROR]: ${e.message}`)
    throw new RouteError(500, 'Could not get invoices')
  }
}

export const createStripeSubscription = async (
  orgId: string,
  stripeCustomerId: string,
  stripePriceId: string,
  quantity: number
): Promise<StripeSubscriptionCreation> => {
  try {
    return stripe.subscriptions.create({
      customer: stripeCustomerId,
      items: [
        {
          price: stripePriceId,
          quantity,
        },
      ],
      metadata: {
        orgId,
      },
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    }) as Promise<StripeSubscriptionCreation>
  } catch (e) {
    console.error(`[STRIPE ERROR]: ${e.message}`)
    throw new RouteError(500, 'Could not create subscription')
  }
}

export const updateStripeSubscription = async (
  stripeSubscriptionId: string,
  stripeSubscriptionItemId: string,
  newQuantity: number
): Promise<Stripe.Subscription> => {
  try {
    return stripe.subscriptions.update(stripeSubscriptionId, {
      items: [
        {
          id: stripeSubscriptionItemId,
          quantity: newQuantity,
        },
      ],
    })
  } catch (e) {
    console.error(`[STRIPE ERROR]: ${e.message}`)
    throw new RouteError(500, 'Could not update subscription')
  }
}

export const getStripeUpcomingInvoice = async (
  stripeCustomerId: string,
  stripeSubscriptionId: string
): Promise<Stripe.UpcomingInvoice> => {
  try {
    return stripe.invoices.retrieveUpcoming({
      customer: stripeCustomerId,
      subscription: stripeSubscriptionId,
    })
  } catch (e) {
    console.error(`[STRIPE ERROR]: ${e.message}`)
    throw new RouteError(500, 'Could not get upcoming invoice')
  }
}
