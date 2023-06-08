import { gql, Member_Role_Enum } from '@gql'
import { SubscriptionIntentResponse } from '@shared/model/subscription'
import { addressSchema, subscriptionPlanTypeSchema } from '@shared/schemas'
import { adminRequest } from '@utils/adminRequest'
import { getPlanTypePriceId } from '@utils/getPlanTypePriceId'
import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { guardOrg } from '@utils/guardOrg'
import { isSubscriptionActive } from '@utils/isSubscriptionActive'
import { route, RouteError } from '@utils/route'
import {
  createStripeCustomer,
  createStripeSubscription,
  deleteStripeSubscription,
} from '@utils/stripe'
import * as yup from 'yup'

const yupSchema = yup.object().shape({
  orgId: yup.string().required(),
  planType: subscriptionPlanTypeSchema,
  address: addressSchema,
  promotionCode: yup.string().optional().nullable(),
})

export default route(async (context): Promise<SubscriptionIntentResponse> => {
  guardAuth(context)
  const { orgId, planType, promotionCode, address } = guardBodyParams(
    context,
    yupSchema
  )

  const org = (await adminRequest(GET_ORG_DETAILS, { orgId }))?.org_by_pk

  if (!org || !planType) {
    throw new RouteError(400, 'Invalid request')
  }

  await guardOrg(orgId, Member_Role_Enum.Owner, context)

  const user = (await adminRequest(GET_USER_EMAIL, { id: context.userId })).user

  if (!user || !user.email) {
    console.error('[SUBSCRIPTION ERROR]: could not retrieve user email')
    throw new RouteError(500, 'Internal server error') // Should not happen but better be careful
  }

  const orgSubscription = (
    await adminRequest(GET_ORG_SUBSCRIPTION_STATUS, { orgId })
  )?.org_subscription[0]

  const status = orgSubscription?.status
  let customerId = orgSubscription?.stripeCustomerId
  let subscriptionId = orgSubscription?.stripeSubscriptionId
  let currentPlanType = orgSubscription?.type

  if (isSubscriptionActive(status)) {
    // A subscription is already active, at the moment throwing an error as there is only one plan available
    if (currentPlanType === planType) {
      throw new RouteError(400, 'Subscription already active')
    }

    if (subscriptionId) {
      await deleteStripeSubscription(subscriptionId)
    }
  }

  const priceId = getPlanTypePriceId(planType)
  const quantity = org.members.filter((mem) => !!mem.userId)?.length // Number of active members inside the org

  if (!quantity || quantity === 0) {
    console.error(
      `[SUBSCRIPTION ERROR]: could not calculate quantity for org ${orgId}`
    )
    throw new RouteError(500, 'Internal server error') // Should not happen but better be carefull
  }

  if (!customerId) {
    customerId = (await createStripeCustomer(user.email, org.name, address)).id
  }

  const stripeSubscription = await createStripeSubscription(
    orgId,
    customerId,
    priceId,
    quantity,
    promotionCode
  )
  console.log(
    { orgId },
    { customerId },
    { priceId },
    { quantity },
    { promotionCode },
    { planType },
    { user }
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
    stripeSubscription.latest_invoice?.payment_intent?.client_secret ?? ''
  const pricePerSeat = stripeSubscription.items.data[0].price.unit_amount ?? 0

  return {
    subscriptionId: stripeSubscription.id,
    clientSecret,
    isFreeOrTrial: !clientSecret || pricePerSeat === 0,
    price: {
      quantity: stripeSubscription.items.data[0].quantity ?? 0,
      totalPerSeatInCents: pricePerSeat,
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
