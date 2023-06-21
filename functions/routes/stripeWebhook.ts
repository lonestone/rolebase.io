import { gql, Member_Role_Enum, Subscription_Payment_Status_Enum } from '@gql'
import { SubscriptionLimits } from '@shared/model/subscription'
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

  // Handle webhook event (https://stripe.com/docs/billing/subscriptions/webhooks)
  switch (event.type) {
    case 'invoice.paid':
      // Payment has been successfull
      // Send an email ?
      break
    case 'invoice.upcoming':
      // Customer will be charged in a few days, should we send an email ?
      break
    case 'invoice.payment_failed':
      // Payment failed
      // Send an email ?
      break
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
      await updateSubscription(event.data.object as Stripe.Subscription)
      break
    case 'customer.subscription.deleted':
      await deleteSubscription((event.data.object as Stripe.Subscription).id)
      break
    case 'payment_method.attached':
      await updateDefaultPaymentMethod(
        event.data.object as Stripe.PaymentMethod
      )
      break
    default:
      console.log(`[STRIPE WEBHOOK]: Unhandled event type ${event.type}`)
      break
  }
})

const validateEvent = (context: FunctionContext): Stripe.Event => {
  // Verify that the call came from Stripe
  const sig = context.req.headers['stripe-signature']
  const endpointSecret: string = process.env.STRIPE_ENDPOINT_SECRET ?? ''

  try {
    return stripe.webhooks.constructEvent(
      // @ts-ignore - rawBody does exists
      context.req.rawBody,
      sig!,
      endpointSecret
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

const deleteSubscription = async (subscriptionId: string) => {
  // Limiting the number of active members
  const orgRequestResult = await adminRequest(GET_ORG_MEMBERS, {
    subscriptionId,
  })
  const org = orgRequestResult?.org[0]

  if (org) {
    const owners = org.members.filter(
      (mem) => mem.role === Member_Role_Enum.Owner
    )
    const admin = org.members.filter(
      (mem) => mem.role === Member_Role_Enum.Admin
    )
    const orgAdmins = owners.concat(admin)

    const memberIdsToUpdate = orgAdmins
      .splice(SubscriptionLimits['free'] || 1, orgAdmins.length)
      .map((m) => m.id)

    await adminRequest(UPDATE_ACTIVE_MEMBER_TO_REGULAR, {
      ids: memberIdsToUpdate,
    })
  }
  // Not deleting it from the database as it would prevent us from retrieving past invoices
  return adminRequest(UPDATE_ORG_SUBSCRIPTION_STATUS, {
    stripeSubscriptionId: subscriptionId,
    status: Subscription_Payment_Status_Enum.Canceled,
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

const UPDATE_ACTIVE_MEMBER_TO_REGULAR = gql(`
  mutation updateActiveMembersToMembers ($ids: [uuid!]){
    update_member_many(updates: {where: {id: {_in: $ids}}, _set: {userId: null}}) {
      returning {
        id
      }
    }
  }
`)

const GET_ORG_MEMBERS = gql(`
  query getOrgMembersWithRolesFromSubscriptionId($subscriptionId: String!) {
    org(where: {org_subscription: {stripeSubscriptionId: {_eq: $subscriptionId}}}) {
      id
      members {
        id
        userId
        role
      }
    }
  }
`)
