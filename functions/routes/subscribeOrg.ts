<<<<<<< HEAD
import {
  gql,
  Member_Role_Enum,
  Subscription_Payment_Status_Enum,
  Subscription_Plan_Type_Enum,
} from '@gql'
import { SubscriptionIntentResponse } from '@shared/model/subscription'
import { subscriptionPlanTypeSchema } from '@shared/schemas'
=======
import { gql, Member_Role_Enum } from '@gql'
>>>>>>> 4e05c0a (rebase)
import { adminRequest } from '@utils/adminRequest'
import { getMemberById } from '@utils/getMemberById'
import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { guardOrg } from '@utils/guardOrg'
import { route, RouteError } from '@utils/route'
<<<<<<< HEAD
import { createStripeCustomer, createStripeSubscription } from '@utils/stripe'
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
=======
import * as yup from 'yup'

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

const yupSchema = yup.object().shape({
  memberId: yup.string().required(),
  orgId: yup.string().required(),
})

type SubscriptionIntent = {
  subscriptionId: string
  clientSecret: string
}

export default route(async (context): Promise<SubscriptionIntent> => {
  guardAuth(context)
  const { memberId, orgId } = guardBodyParams(context, yupSchema)

  // Get member
  const member = await getMemberById(memberId)
  const org = await adminRequest(GET_ORG, { orgId })

  if (!member || !org) {
>>>>>>> 4e05c0a (rebase)
    throw new RouteError(400, 'Invalid request')
  }

  await guardOrg(context, member.orgId, Member_Role_Enum.Owner)

<<<<<<< HEAD
  const user = (await adminRequest(GET_USER_EMAIL, { id: member.userId })).user

  if (!user || !user.email) {
    console.error(
      `[SUBSCRIPTION ERROR]: could not retrieve user for member ${member.id}`
    )
    throw new RouteError(500, 'Internal server error1') // Should not happen but better be carefull
  }

  const orgSubscription = (
    await adminRequest(GET_ORG_SUBSCRIPTION_STATUS, { orgId })
  )?.org_subscription[0]

  const status = orgSubscription?.status
  let customerId = orgSubscription?.stripeCustomerId

  if (status === Subscription_Payment_Status_Enum.Active) {
    // A subscription is already active, at the moment throwing an error as there is only one plan available
    // Should add code to upgrade or downgrade subscription here
    throw new RouteError(400, 'Subscription already active')
  }

  if (status === Subscription_Payment_Status_Enum.Incomplete) {
    // A suscription is awaiting payment and has not expired yet
    throw new RouteError(400, 'Subscription awaiting payment')
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
=======
  // Should check if org has already a customerId then use it, otherwise create a new one
  const { id: customerId } = await createCustomer()

  const priceId = 'price_1MUWojFbDx5R7pId7yJFun1L' // retrieve it from sub plan
  const quantity = 5 // Number of active members inside the org

  // Create a new subscription with the 'incomplete' status
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [
      {
        price: priceId,
        quantity,
      },
    ],
    payment_behavior: 'default_incomplete',
    payment_settings: { save_default_payment_method: 'on_subscription' },
    expand: ['latest_invoice.payment_intent'],
  })

  console.log('Subscription:', subscription)

  const subscriptionId = subscription.id
  const clientSecret = subscription.latest_invoice.payment_intent.client_secret

  return {
    subscriptionId,
>>>>>>> 4e05c0a (rebase)
    clientSecret,
  }
})

<<<<<<< HEAD
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
=======
const GET_ORG = gql(`
  query getOrg($orgId: uuid!) {
    org_by_pk(id: $orgId) {
      id
      members {
        role
>>>>>>> 4e05c0a (rebase)
      }
    }
  }`)

<<<<<<< HEAD
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
    // TODO: define Enterprise plan
    case Subscription_Plan_Type_Enum.Enterprise:
    default:
      break
  }

  if (!priceId) {
    throw new RouteError(400, 'Plan does not exists')
  }

  return priceId
=======
const createCustomer = async () => {
  // Required fields that will need to be retrieved
  const email = 'noe@lonestone.io'
  const name = 'Noé'

  const customer = await stripe.customers.create({
    email,
    name,
  })

  return customer
>>>>>>> 4e05c0a (rebase)
}
