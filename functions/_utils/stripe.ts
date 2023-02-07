import { RouteError } from '@utils/route'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY ?? '', {
  apiVersion: '2022-11-15',
})

const acceptedPaymentMethods: Stripe.SubscriptionCreateParams.PaymentSettings.PaymentMethodType[] =
  ['card']

type StripeSubscriptionCreation = Stripe.Subscription & {
  latest_invoice: Stripe.Invoice & {
    payment_intent: Stripe.PaymentIntent
  }
}

export type ExtendedStripeCustomer = (
  | Stripe.Customer
  | Stripe.DeletedCustomer
) & {
  subscriptions: {
    data: Stripe.Subscription[]
  }
  invoice_settings: {
    default_payment_method: Stripe.PaymentMethod
  }
}

export const createStripeCustomer = async (
  email: string,
  name: string
): Promise<Stripe.Customer> => {
  try {
    const customer = await stripe.customers.create({
      email,
      name,
    })

    return customer
  } catch (e) {
    console.error(`[STRIPE ERROR]: ${e.message}`)
    throw new RouteError(500, 'Could not create customer')
  }
}

export const getStripeCustomerFromCustomerId = async (
  stripeCustomerId: string
): Promise<Stripe.Customer | Stripe.DeletedCustomer> => {
  try {
    const customer = await stripe.customers.retrieve(stripeCustomerId)

    return customer
  } catch (e) {
    console.error(`[STRIPE ERROR]: ${e.message}`)
    throw new RouteError(500, 'Could not retrieve customer')
  }
}

export const getStripeSubscriptionFromSubscriptionId = async (
  stripeSubscriptionId: string
): Promise<Stripe.Subscription> => {
  try {
    const subscription = await stripe.subscriptions.retrieve(
      stripeSubscriptionId
    )

    return subscription
  } catch (e) {
    console.error(`[STRIPE ERROR]: ${e.message}`)
    throw new RouteError(500, 'Could not retrieve subscription')
  }
}

export const getStripeExtendedCustomer = async (
  stripeCustomerId: string
): Promise<ExtendedStripeCustomer> => {
  try {
    const customer = await stripe.customers.retrieve(stripeCustomerId, {
      expand: [
        'invoice_settings.default_payment_method.card',
        'subscriptions.data',
      ],
    })

    return customer as unknown as ExtendedStripeCustomer
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
): Promise<Stripe.Subscription> => {
  try {
    const subscription = await stripe.subscriptions.update(
      stripeSubscriptionId,
      {
        cancel_at_period_end: true,
      }
    )

    return subscription
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
    const invoices = await stripe.invoices.list({
      customer: stripeCustomerId,
      subscription: stripeSubscriptionId,
    })

    return invoices
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
    const subscription = await stripe.subscriptions.create({
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
      payment_settings: {
        payment_method_types: acceptedPaymentMethods,
      },
    })

    return subscription as StripeSubscriptionCreation
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
    const subscription = await stripe.subscriptions.update(
      stripeSubscriptionId,
      {
        items: [
          {
            id: stripeSubscriptionItemId,
            quantity: newQuantity,
          },
        ],
      }
    )

    return subscription
  } catch (e) {
    console.error(`[STRIPE ERROR]: ${e.message}`)
    throw new RouteError(500, 'Could not update subscription')
  }
}

export const updateStripeCustomer = async (
  stripeCustomerId: string,
  ...rest
): Promise<Stripe.Customer | Stripe.DeletedCustomer> => {
  try {
    const customer = await stripe.customers.update(stripeCustomerId, ...rest)

    return customer
  } catch (e) {
    console.error(`[STRIPE ERROR]: ${e.message}`)
    throw new RouteError(500, 'Could not update subscription')
  }
}

export const createStripeSetupIntent = async (
  stripeCustomerId: string,
  ...rest
): Promise<Stripe.SetupIntent> => {
  try {
    const intent = await stripe.setupIntents.create({
      customer: stripeCustomerId,
      payment_method_types: acceptedPaymentMethods,
    })

    return intent
  } catch (e) {
    console.error(`[STRIPE ERROR]: ${e.message}`)
    throw new RouteError(500, 'Could not update subscription')
  }
}

export const getStripeUpcomingInvoice = async (
  stripeCustomerId: string,
  stripeSubscriptionId: string
): Promise<Stripe.UpcomingInvoice | null> => {
  try {
    const invoice = await stripe.invoices.retrieveUpcoming({
      customer: stripeCustomerId,
      subscription: stripeSubscriptionId,
    })

    return invoice
  } catch (e) {
    if (e.code === 'invoice_upcoming_none') return null

    console.error(`[STRIPE ERROR]: ${e.message}`)
    throw new RouteError(500, 'Could not get upcoming invoice')
  }
}

export const deleteStripeSubscription = async (
  stripeSubscriptionId: string
): Promise<Stripe.Subscription> => {
  try {
    const subscription = await stripe.subscriptions.del(stripeSubscriptionId)

    return subscription
  } catch (e) {
    console.error(`[STRIPE ERROR]: ${e.message}`)
    throw new RouteError(500, 'Could not delete subscription')
  }
}

export const stripeResumeSubscription = async (
  stripeSubscriptionId: string
): Promise<Stripe.Subscription> => {
  try {
    const subscription = await stripe.subscriptions.update(
      stripeSubscriptionId,
      { cancel_at_period_end: false }
    )

    return subscription
  } catch (e) {
    console.error(`[STRIPE ERROR]: ${e.message}`)
    throw new RouteError(500, 'Could not resume subscription')
  }
}
