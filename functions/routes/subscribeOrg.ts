import {
  gql,
  Member_Role_Enum,
  Org_Subscription_Status_Enum,
  Subscription_Plan_Type_Enum
} from '@gql'
import { subscriptionPlanTypeSchema } from '@shared/schemas'
import { adminRequest } from '@utils/adminRequest'
import { getMemberById } from '@utils/getMemberById'
import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { guardOrg } from '@utils/guardOrg'
import { route, RouteError } from '@utils/route'
import * as yup from 'yup'

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

const yupSchema = yup.object().shape({
  memberId: yup.string().required(),
  orgId: yup.string().required(),
  planType: subscriptionPlanTypeSchema,
})

type SubscriptionIntent = {
  subscriptionId: string
  clientSecret: string
}

export default route(async (context): Promise<SubscriptionIntent> => {
  guardAuth(context)
  const { memberId, orgId, planType } = guardBodyParams(context, yupSchema)

  // Get member
  const member = await getMemberById(memberId)
  const org = await adminRequest(GET_ORG_DETAILS, { orgId })
  if (!member || !org || !planType) {
    throw new RouteError(400, 'Invalid request')
  }

  await guardOrg(context, member.orgId, Member_Role_Enum.Owner)

  const priceId = getPriceId(planType)

  if (!priceId) {
    throw new RouteError(400, 'Plan does not exists')
  }
  const quantity = org.org_by_pk?.members.filter((mem) => !!mem.userId)?.length // Number of active members inside the org

  if (!quantity) {
    throw new RouteError(500, 'Internal server error here') // Should not happen but better be carefull
  }

  const orgSubscription = await adminRequest(GET_ORG_SUBSCRIPTION, { orgId })
  let orgSubscriptionId: string | undefined =
    orgSubscription?.org_subscription[0]?.id
  let customerId = orgSubscription?.org_subscription[0]?.stripeCustomerId

  if (
    orgSubscription.org_subscription[0]?.stripeSubscriptionId &&
    orgSubscription.org_subscription[0]?.status ===
      Org_Subscription_Status_Enum.Active
  ) {
    // A subscription is already active, at the moment throwing an error as there is only one plan available
    // Should add code to upgrade or downgrade subscription here
    throw new RouteError(400, 'Subscription already active')
  }

  if (!orgSubscriptionId) {
    customerId = (await createCustomer()).id
    // Create subscription
    orgSubscriptionId = (
      await adminRequest(CREATE_ORG_SUBSCRIPTION, {
        orgId,
        customerId,
        type: planType,
        status: Org_Subscription_Status_Enum.Inactive,
      })
    ).insert_org_subscription_one?.id
  }

  // Create a new subscription with the 'incomplete' status
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [
      {
        price: priceId,
        quantity,
      },
    ],
    metadata: {
      orgSubscriptionId,
    },
    payment_behavior: 'default_incomplete',
    payment_settings: { save_default_payment_method: 'on_subscription' },
    expand: ['latest_invoice.payment_intent'],
  })

  await adminRequest(UPDATE_ORG_SUBSCRIPTION, {
    id: orgSubscriptionId,
    status: Org_Subscription_Status_Enum.Pending,
    stripeSubscriptionId: subscription.id,
    type: planType,
  })

  // If free trial is implemented, the clientSecret will not be present
  // To avoid a crash, maybe return a status that the front will handle ?

  const subscriptionId = subscription.id
  const clientSecret = subscription.latest_invoice.payment_intent.client_secret

  return {
    subscriptionId,
    clientSecret,
  }
})

const GET_ORG_DETAILS = gql(`
  query getOrgId($orgId: uuid!) {
    org_by_pk(id: $orgId) {
      id
      members {
        id
        userId
      }
    }
  }`)

const UPDATE_ORG_SUBSCRIPTION = gql(`
  mutation updateOrgSubscription($id: uuid!, $stripeSubscriptionId: String!, $status: org_subscription_status_enum!, $type: subscription_plan_type_enum!) {
    update_org_subscription(where: {id: {_eq: $id}}, _set: {status: $status, stripeSubscriptionId: $stripeSubscriptionId, type: $type}) {
      returning {
        id
      }
    }
  }`)

const CREATE_ORG_SUBSCRIPTION = gql(`
  mutation createOrgSubscription($orgId: uuid!, $type: subscription_plan_type_enum!, $customerId: String!, $status: org_subscription_status_enum!) {
    insert_org_subscription_one(object: {
      orgId: $orgId
      stripeCustomerId: $customerId
      type: $type
      status: $status
    }) {
      id
    }
  }`)

const GET_ORG_SUBSCRIPTION = gql(`
  query getOrgSubscription($orgId: uuid!) {
    org_subscription(where: {orgId: {_eq: $orgId}}) {
      id
      stripeCustomerId
      stripeSubscriptionId
      type
      status
    }
  }`)

const getPriceId = (planType: Subscription_Plan_Type_Enum) => {
  switch (planType) {
    case Subscription_Plan_Type_Enum.Startup:
      return process.env.STRIPE_STARTUP_PLAN_PRICE_ID
    // TODO: define Enterprise plan
    case Subscription_Plan_Type_Enum.Enterprise:
    case Subscription_Plan_Type_Enum.Free:
    default:
      return null
  }
}

const createCustomer = async () => {
  // Required fields that will need to be retrieved
  const email = 'noe@lonestone.io'
  const name = 'Noé'

  const customer = await stripe.customers.create({
    email,
    name,
  })

  return customer
}
