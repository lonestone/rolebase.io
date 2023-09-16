import { gql, Member_Role_Enum } from '@gql'
import { UpcomingInvoice } from '@shared/model/subscription'
import { adminRequest } from '@utils/adminRequest'
import { dateFromSeconds } from '@utils/dateFromSeconds'
import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { guardOrg } from '@utils/guardOrg'
import { route, RouteError } from '@utils/route'
import { getStripeUpcomingInvoice } from '@utils/stripe'
import Stripe from 'stripe'
import * as yup from 'yup'

const yupSchema = yup.object().shape({
  orgId: yup.string().required(),
})

export default route(async (context): Promise<UpcomingInvoice | null> => {
  guardAuth(context)
  const { orgId } = guardBodyParams(context, yupSchema)

  await guardOrg(orgId, Member_Role_Enum.Owner, context)

  const orgSubscription = await adminRequest(GET_ORG_SUBSCRIPTION, { orgId })
  const stripeSubscriptionId =
    orgSubscription?.org_subscription[0]?.stripeSubscriptionId
  const stripeCustomerId =
    orgSubscription?.org_subscription[0]?.stripeCustomerId

  if (!stripeSubscriptionId || !stripeCustomerId) {
    throw new RouteError(400, 'Invalid request')
  }

  // Get stripe invoices
  const stripeUpcomingInvoice = await getStripeUpcomingInvoice(
    stripeSubscriptionId
  )

  if (!stripeUpcomingInvoice) return null

  return formatStripeUpcomingInvoice(stripeUpcomingInvoice)
})

const formatStripeUpcomingInvoice = (
  stripeUpcomingInvoice: Stripe.UpcomingInvoice
): UpcomingInvoice => {
  return {
    nextPayment: dateFromSeconds(
      stripeUpcomingInvoice.next_payment_attempt ??
        stripeUpcomingInvoice.lines.data[0].period.end
    ),
    totalInCents: stripeUpcomingInvoice.total,
  }
}

const GET_ORG_SUBSCRIPTION = gql(`
    query getOrgSubscriptionStripeIds($orgId: uuid!) {
      org_subscription(where: {orgId: {_eq: $orgId}}) {
        id
        stripeSubscriptionId
        stripeCustomerId
      }
    }`)
