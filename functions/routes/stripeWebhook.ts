import { gql } from '@gql'
import { adminRequest } from '@utils/adminRequest'
import { FunctionContext } from '@utils/getContext'
import { route, RouteError } from '@utils/route'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY ?? '', {
  apiVersion: '2022-11-15',
})

export default route(async (context): Promise<void> => {
  // Immediatelly sending status as per Stripe doc
  context.res.sendStatus(200)

  const event = validateEvent(context)

  console.log('Received event:', event.type)

  // Handle webhook event (https://stripe.com/docs/billing/subscriptions/webhooks)
  switch (event.type) {
    case 'invoice.paid':
      // Payment has been successfull
      break
    case 'invoice.upcoming':
      // Customer will be charged in a few days, should we send an email ?
      break
    case 'invoice.payment_failed':
      // Payment failed
      // Maybe send an email
      break
    case 'customer.subscription.updated':
      await updateSubscription(event.data.object as Stripe.Subscription)
      break
    case 'customer.subscription.deleted':
      await deleteSubscription(event.data.object as Stripe.Subscription)
      break
    case 'payment_method.attached':
      await updateDefaultPaymentMethod(
        event.data.object as Stripe.PaymentMethod
      )
      // TODO: Save en tant que moyen de paiement par defaut       const paymentMethods = event.data?.object
      break
    default:
      break // console.log(`Unhandled event type ${event.type}`)
  }
})

const validateEvent = (context: FunctionContext): Stripe.Event => {
  // Verify that the call came from Stripe
  try {
    const sig = context.req.headers['stripe-signature']
    const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET

    return stripe.webhooks.constructEvent(
      // @ts-ignore - rawBody does exists
      context.req.rawBody,
      sig!,
      endpointSecret!
    )
  } catch (err) {
    console.error(`[STRIPE WEBHOOK ERROR]: ${err.message}`)
    throw new RouteError(400, `Webhook Error: ${err.message}`)
  }
}

const updateDefaultPaymentMethod = async (
  paymentMethod: Stripe.PaymentMethod
) => {
  if (!paymentMethod.customer)
    throw new RouteError(500, 'Internal server error')

  const customer = paymentMethod.customer
  const customerId = typeof customer === 'string' ? customer : customer.id

  return stripe.customers.update(customerId, {
    invoice_settings: { default_payment_method: paymentMethod.id },
  })
}

const deleteSubscription = async (subscription: Stripe.Subscription) => {
  return adminRequest(DELETE_ORG_SUBSCRIPTION, {
    subscriptionId: subscription.id,
  })
}

const updateSubscription = async (subscription: Stripe.Subscription) => {
  return adminRequest(UPDATE_ORG_SUBSCRIPTION_STATUS, {
    stripeSubscriptionId: subscription.id,
    status: subscription.status,
  })
}

const UPDATE_ORG_SUBSCRIPTION_STATUS = gql(`
  mutation updateOrgSubscriptionStatusByStripeSubId($stripeSubscriptionId: String!, $status: subscription_payment_status_enum!) {
    update_org_subscription(where: {stripeSubscriptionId: {_eq: $stripeSubscriptionId}}, _set: {status: $status}) {
      returning {
        id
      }
    }
  }`)

const DELETE_ORG_SUBSCRIPTION = gql(`
  mutation deleteOrgSubscription($subscriptionId: String!) {
    delete_org_subscription(where: {stripeSubscriptionId: {_eq: $subscriptionId}}) {
      affected_rows
    }
  }
`)
