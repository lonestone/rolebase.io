import {
  gql,
  Member_Role_Enum,
  Subscription_Payment_Status_Enum,
  Subscription_Plan_Type_Enum,
} from '@gql'
import { Subscription } from '@shared/model/subscription'
import { adminRequest } from '@utils/adminRequest'
import { getMemberById } from '@utils/getMemberById'
import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { guardOrg } from '@utils/guardOrg'
import { route, RouteError } from '@utils/route'
import {
  ExtendedStripeCustomer,
  getStripeExtendedCustomer,
  getStripeUpcomingInvoice,
} from '@utils/stripe'
import Stripe from 'stripe'
import * as yup from 'yup'

const yupSchema = yup.object().shape({
  memberId: yup.string().required(),
  orgId: yup.string().required(),
})

export default route(async (context): Promise<Subscription | null> => {
  guardAuth(context)
  const { memberId, orgId } = guardBodyParams(context, yupSchema)

  // Get member
  const member = await getMemberById(memberId)
  const org = await adminRequest(GET_ORG, { orgId })
  if (!member || !org) {
    throw new RouteError(400, 'Invalid request')
  }

  await guardOrg(context, member.orgId, Member_Role_Enum.Owner)

  const orgSubscription = await adminRequest(GET_ORG_SUBSCRIPTION, { orgId })
  const stripeSubscriptionId =
    orgSubscription?.org_subscription[0]?.stripeSubscriptionId
  const stripeCustomerId =
    orgSubscription?.org_subscription[0]?.stripeCustomerId
  const orgSubscriptionStatus = orgSubscription?.org_subscription[0]?.status
  const orgSubscriptionType = orgSubscription?.org_subscription[0]?.type

  if (
    !stripeSubscriptionId ||
    !stripeCustomerId ||
    (orgSubscriptionStatus !== Subscription_Payment_Status_Enum.Active &&
      orgSubscriptionStatus !== Subscription_Payment_Status_Enum.Trialing)
  ) {
    return null
  }

  // Get stripe invoices
  const customer = await getStripeExtendedCustomer(stripeCustomerId)
  const subscription = customer.subscriptions.data.find(
    (sub) => sub.id === stripeSubscriptionId
  )

  const upcomingInvoice = await getStripeUpcomingInvoice(
    stripeCustomerId,
    stripeSubscriptionId
  )

  return formatSubscription(
    customer,
    subscription,
    upcomingInvoice,
    orgId,
    orgSubscriptionStatus,
    orgSubscriptionType
  )
})

const formatSubscription = (
  extendedCustomer: ExtendedStripeCustomer,
  subscription: Stripe.Subscription | undefined,
  upcomingInvoice: Stripe.UpcomingInvoice | null,
  orgId: string,
  status: Subscription_Payment_Status_Enum,
  type: Subscription_Plan_Type_Enum
): Subscription => {
  const customerCard =
    extendedCustomer.invoice_settings.default_payment_method.card!
  return {
    card: {
      expMonth: customerCard?.exp_month,
      expYear: customerCard?.exp_year,
      last4: customerCard?.last4,
      brand: customerCard?.brand,
    },
    orgId,
    upcomingInvoice: upcomingInvoice
      ? {
          nextPayment: toDateTime(
            upcomingInvoice.next_payment_attempt ??
              upcomingInvoice.lines.data[0].period.end
          ),
          totalInCents: upcomingInvoice?.total!,
        }
      : null,
    status,
    type,
    billingDetails: {
      address: extendedCustomer.deleted
        ? null
        : extendedCustomer.address ?? null,
      email: extendedCustomer.deleted ? '' : extendedCustomer.email,
      name: extendedCustomer.deleted ? '' : extendedCustomer.name,
    },
    expiresAt: subscription?.cancel_at
      ? toDateTime(subscription?.cancel_at ?? 0)
      : null,
  }
}

const toDateTime = (secs: number): Date => {
  const t = new Date(1970, 0, 1) // Epoch
  t.setSeconds(secs)
  return t
}

const GET_ORG = gql(`
    query getOrgById($orgId: uuid!) {
      org_by_pk(id: $orgId) {
        id
      }
    }`)

const GET_ORG_SUBSCRIPTION = gql(`
    query getOrgSubscriptionDetails($orgId: uuid!) {
      org_subscription(where: {orgId: {_eq: $orgId}}) {
        id
        stripeSubscriptionId
        stripeCustomerId
        status
        type
      }
    }`)
