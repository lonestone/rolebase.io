import {
  gql,
  Member_Role_Enum,
  Subscription_Payment_Status_Enum,
  Subscription_Plan_Type_Enum,
} from '@gql'
import { Subscription } from '@shared/model/subscription'
import { adminRequest } from '@utils/adminRequest'
import { dateFromSeconds } from '@utils/dateFromSeconds'
import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { guardOrg } from '@utils/guardOrg'
import { isSubscriptionActive } from '@utils/isSubscriptionActive'
import { route } from '@utils/route'
import {
  ExtendedStripeCustomer,
  getStripeExtendedCustomer,
  getStripeUpcomingInvoice,
} from '@utils/stripe'
import Stripe from 'stripe'
import * as yup from 'yup'

const yupSchema = yup.object().shape({
  orgId: yup.string().required(),
})

export default route(async (context): Promise<Subscription | null> => {
  guardAuth(context)
  const { orgId } = guardBodyParams(context, yupSchema)

  await guardOrg(orgId, Member_Role_Enum.Owner, context)

  const orgSubscription = (
    await adminRequest(GET_ORG_SUBSCRIPTION, {
      orgId,
    })
  )?.org_subscription?.[0]
  const stripeSubscriptionId = orgSubscription?.stripeSubscriptionId
  const stripeCustomerId = orgSubscription?.stripeCustomerId
  const orgSubscriptionStatus = orgSubscription?.status
  const orgSubscriptionType = orgSubscription?.type

  if (!stripeCustomerId || !isSubscriptionActive(orgSubscriptionStatus)) {
    return null
  }

  let subscription: Stripe.Subscription | null = null
  let customer: ExtendedStripeCustomer | null = null
  let upcomingInvoice: Stripe.UpcomingInvoice | null = null

  try {
    // Get stripe invoices
    customer = await getStripeExtendedCustomer(stripeCustomerId)
    subscription =
      customer.subscriptions.data.find(
        (sub) => sub.id === stripeSubscriptionId
      ) || null

    upcomingInvoice = stripeSubscriptionId
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
      customer,
      subscription,
      upcomingInvoice,
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
    extendedCustomer?.invoice_settings?.default_payment_method?.card

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
