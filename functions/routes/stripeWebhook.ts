import {
  Org_Subscription_Status_Enum,
  Subscription_Plan_Type_Enum,
  gql,
} from '@gql'
import { adminRequest } from '@utils/adminRequest'
import { RouteError, route } from '@utils/route'

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

export default route(async (context): Promise<void> => {
  const sig = context.req.headers['stripe-signature']
  const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET

  let event

  // Verify that the call came from Stripe
  try {
    event = stripe.webhooks.constructEvent(
      // @ts-ignore - rawBody does exists
      context.req.rawBody,
      sig,
      endpointSecret
    )
  } catch (err) {
    console.log('Err:', err.message)
    throw new RouteError(400, `Webhook Error: ${err.message}`)
  }

  // Handle webhook event (https://stripe.com/docs/billing/subscriptions/webhooks)
  switch (event.type) {
    case 'customer.subscription.updated':
      if (event.data?.object?.status === 'active') {
        await validateSubscription(event.data.object)
        console.log('PaymentIntent was successful!')
      }
      break
    case 'customer.subscription.deleted':
      await cancelSubscription(event.data.object)
      console.log('Successfully deleted subscription!')
      break
    default:
      console.log(`Unhandled event type ${event.type}`)
  }
})

const cancelSubscription = async (subscription) => {
  const subId = subscription.id
  const orgSubscription = await adminRequest(GET_ORG_SUBSCRIPTION, {
    stripeSubscriptionId: subId,
  })

  await adminRequest(UPDATE_ORG_SUBSCRIPTION_CANCEL, {
    id: orgSubscription.org_subscription[0].id,
    status: Org_Subscription_Status_Enum.Inactive,
    type: Subscription_Plan_Type_Enum.Free,
  })
}

const validateSubscription = async (subscription) => {
  const subId = subscription.id
  const orgSubscription = await adminRequest(GET_ORG_SUBSCRIPTION, {
    stripeSubscriptionId: subId,
  })
  await adminRequest(UPDATE_ORG_SUBSCRIPTION_VALIDATE, {
    id: orgSubscription.org_subscription[0].id,
    status: Org_Subscription_Status_Enum.Active,
    stripeSubscriptionItemId: subscription.items.data[0].id,
  })
}

const GET_ORG_SUBSCRIPTION = gql(`
  query getOrgSubscriptionBySubscriptionId($stripeSubscriptionId: String!) {
    org_subscription(where: {stripeSubscriptionId: {_eq: $stripeSubscriptionId}}) {
      id
    }
  }`)

const UPDATE_ORG_SUBSCRIPTION_VALIDATE = gql(`
  mutation updateOrgSubscriptionValidate($id: uuid!, $status: org_subscription_status_enum!, $stripeSubscriptionItemId: String!) {
    update_org_subscription(where: {id: {_eq: $id}}, _set: {status: $status, stripeSubscriptionItemId: $stripeSubscriptionItemId}) {
      returning {
        id
      }
    }
  }`)

const UPDATE_ORG_SUBSCRIPTION_CANCEL = gql(`
  mutation updateOrgSubscriptionCancelation($id: uuid!, $status: org_subscription_status_enum!, $type: subscription_plan_type_enum) {
    update_org_subscription(where: {id: {_eq: $id}}, _set: {status: $status, stripeSubscriptionId: null, stripeSubscriptionItemId: null, type: $type}) {
      returning {
        id
      }
    }
  }`)
