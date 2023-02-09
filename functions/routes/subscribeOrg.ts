import {
  gql,
  Member_Role_Enum,
  Subscription_Payment_Status_Enum,
  Subscription_Plan_Type_Enum,
} from '@gql'
import { SubscriptionIntentResponse } from '@shared/model/subscription'
import { subscriptionPlanTypeSchema } from '@shared/schemas'
import { adminRequest } from '@utils/adminRequest'
import { getMemberById } from '@utils/getMemberById'
import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { guardOrg } from '@utils/guardOrg'
import { route, RouteError } from '@utils/route'
import {
  createStripeCustomer,
  createStripeSubscription,
  deleteStripeSubscription,
} from '@utils/stripe'
import * as yup from 'yup'

const yupSchema = yup.object().shape({
  memberId: yup.string().required(),
  orgId: yup.string().required(),
  planType: subscriptionPlanTypeSchema,
})

export default route(async (context): Promise<SubscriptionIntentResponse> => {
  guardAuth(context)
  const { memberId, orgId, planType } = guardBodyParams(context, yupSchema)

  // Get member
  const member = await getMemberById(memberId)
  const org = (await adminRequest(GET_ORG_DETAILS, { orgId }))?.org_by_pk

  if (!member || !org || !planType) {
    throw new RouteError(400, 'Invalid request')
  }

  await guardOrg(context, member.orgId, Member_Role_Enum.Owner)

  const user = (await adminRequest(GET_USER_EMAIL, { id: member.userId })).user

  if (!user || !user.email) {
    console.error(
      `[SUBSCRIPTION ERROR]: could not retrieve user for member ${member.id}`
    )
    throw new RouteError(500, 'Internal server error') // Should not happen but better be carefull
  }

  const orgSubscription = (
    await adminRequest(GET_ORG_SUBSCRIPTION_STATUS, { orgId })
  )?.org_subscription[0]

  const status = orgSubscription?.status
  let customerId = orgSubscription?.stripeCustomerId
  let subscriptionId = orgSubscription?.stripeSubscriptionId

  switch (status) {
    case Subscription_Payment_Status_Enum.Active:
    case Subscription_Payment_Status_Enum.Trialing:
      // A subscription is already active, at the moment throwing an error as there is only one plan available
      // Should add code to upgrade or downgrade subscription here
      throw new RouteError(400, 'Subscription already active')
    case Subscription_Payment_Status_Enum.Incomplete:
    default:
      if (subscriptionId) {
        // Current subscription did not go through or has expired
        // We can safely delete the old one on stripe
        await deleteStripeSubscription(subscriptionId)
      }
      break
  }

  const priceId = getPriceId(planType)
  const quantity = org.members.filter((mem) => !!mem.userId)?.length // Number of active members inside the org

  if (!quantity || quantity === 0) {
    console.error(
      `[SUBSCRIPTION ERROR]: could not calculate quantity for org ${orgId}`
    )
    throw new RouteError(500, 'Internal server error') // Should not happen but better be carefull
  }

  if (!customerId) {
    customerId = (await createStripeCustomer(user.email, org.name)).id
  }

  const stripeSubscription = await createStripeSubscription(
    orgId,
    customerId,
    priceId,
    quantity
  )

  if (!orgSubscription) {
    await adminRequest(CREATE_ORG_SUBSCRIPTION, {
      orgId,
      subscriptionId: stripeSubscription.id,
      customerId: customerId,
      type: planType,
    })
  } else {
    await adminRequest(UPDATE_ORG_SUBSCRIPTION, {
      orgId,
      stripeSubscriptionId: stripeSubscription.id,
      type: planType,
    })
  }

  // If free trial is implemented, the clientSecret will not be present
  // To avoid a crash, maybe return a status that the front will handle ?

  const clientSecret =
    stripeSubscription.latest_invoice.payment_intent.client_secret ?? ''

  return {
    subscriptionId: stripeSubscription.id,
    clientSecret,
    price: {
      quantity: stripeSubscription.items.data[0].quantity ?? 0,
      totalPerSeatInCents:
        stripeSubscription.items.data[0].price.unit_amount ?? 0,
    },
  }
})

const GET_USER_EMAIL = gql(`
  query getUserEmail($id: uuid!) {
    user(id: $id) {
      id
      email
    }
  }`)

const GET_ORG_DETAILS = gql(`
  query getOrgId($orgId: uuid!) {
    org_by_pk(id: $orgId) {
      id
      name
      members {
        id
        userId
      }
    }
  }`)

const CREATE_ORG_SUBSCRIPTION = gql(`
  mutation createOrgSubscription($orgId: uuid!, $customerId: String!, $subscriptionId: String!, $type: subscription_plan_type_enum!) {
    insert_org_subscription_one(object: {
      orgId: $orgId
      stripeCustomerId: $customerId
      stripeSubscriptionId: $subscriptionId
      type: $type
    }) {
      id
    }
  }`)

const UPDATE_ORG_SUBSCRIPTION = gql(`
  mutation updateOrgSubscriptionStripeSubId($orgId: uuid!, $stripeSubscriptionId: String!, $type: subscription_plan_type_enum!) {
    update_org_subscription(where: {orgId: {_eq: $orgId}}, _set: {stripeSubscriptionId: $stripeSubscriptionId, type: $type}) {
      returning {
        id
      }
    }
  }`)

const GET_ORG_SUBSCRIPTION_STATUS = gql(`
  query getOrgSubscriptionStatus($orgId: uuid!) {
    org_subscription(where: {orgId: {_eq: $orgId}}) {
      id
      status
      stripeCustomerId
      stripeSubscriptionId
      type
    }
  }`)

const getPriceId = (planType: Subscription_Plan_Type_Enum): string => {
  let priceId: string | undefined

  switch (planType) {
    case Subscription_Plan_Type_Enum.Startup:
      priceId = process.env.STRIPE_STARTUP_PLAN_PRICE_ID
      break
    // TODO: define business plan
    case Subscription_Plan_Type_Enum.Business:
    default:
      break
  }

  if (!priceId) {
    throw new RouteError(400, 'Plan does not exists')
  }

  return priceId
}
