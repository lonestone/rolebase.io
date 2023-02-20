import {
  gql,
  Member_Role_Enum,
  Subscription_Payment_Status_Enum,
  Subscription_Plan_Type_Enum,
} from '@gql'
import { Subscription } from '@shared/model/subscription'
import { adminRequest } from '@utils/adminRequest'
import { dateFromSeconds } from '@utils/dateFromSeconds'
import { getMemberById } from '@utils/getMemberById'
import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { guardOrg } from '@utils/guardOrg'
import { isSubscriptionActive } from '@utils/isSubscriptionActive'
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

  if (!member) {
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

  if (!stripeCustomerId || !isSubscriptionActive(orgSubscriptionStatus)) {
    return null
  }

  try {
    // Get stripe invoices
    const customer = await getStripeExtendedCustomer(stripeCustomerId)
    const subscription = customer.subscriptions.data.find(
      (sub) => sub.id === stripeSubscriptionId
    )

    const upcomingInvoice = stripeSubscriptionId
      ? await getStripeUpcomingInvoice(stripeSubscriptionId)
      : null

    return formatSubscription(
      customer,
      subscription,
      upcomingInvoice,
      orgId,
      orgSubscriptionStatus,
      orgSubscriptionType
    )
  } catch (e) {
    return formatSubscription(
      null,
      null,
      null,
      orgId,
      orgSubscriptionStatus,
      orgSubscriptionType
    )
  }
})

const formatSubscription = (
  extendedCustomer: ExtendedStripeCustomer | null,
  subscription: Stripe.Subscription | null | undefined,
  upcomingInvoice: Stripe.UpcomingInvoice | null,
  orgId: string,
  status: Subscription_Payment_Status_Enum,
  type: Subscription_Plan_Type_Enum
): Subscription => {
  const customerCard =
    extendedCustomer?.invoice_settings.default_payment_method.card
  return {
    card: customerCard
      ? {
          expMonth: customerCard?.exp_month,
          expYear: customerCard?.exp_year,
          last4: customerCard?.last4,
          brand: customerCard?.brand,
        }
      : null,
    orgId,
    upcomingInvoice: upcomingInvoice
      ? {
          nextPayment: dateFromSeconds(
            upcomingInvoice.next_payment_attempt ??
              upcomingInvoice.lines.data[0].period.end
          ),
          totalInCents: upcomingInvoice?.total!,
        }
      : null,
    status,
    type,
    billingDetails: extendedCustomer && {
      address: extendedCustomer?.deleted
        ? null
        : extendedCustomer?.address ?? null,
      email: extendedCustomer?.deleted ? '' : extendedCustomer?.email,
      name: extendedCustomer?.deleted ? '' : extendedCustomer?.name,
    },
    expiresAt: subscription?.cancel_at
      ? dateFromSeconds(subscription?.cancel_at ?? 0)
      : null,
  }
}

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
