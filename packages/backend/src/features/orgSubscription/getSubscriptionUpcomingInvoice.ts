import { UpcomingInvoice } from '@rolebase/shared/model/subscription'
import { TRPCError } from '@trpc/server'
import Stripe from 'stripe'
import * as yup from 'yup'
import { gql, Member_Role_Enum } from '../../gql'
import { guardOrg } from '../../guards/guardOrg'
import { authedProcedure } from '../../trpc/authedProcedure'
import { adminRequest } from '../../utils/adminRequest'
import { dateFromSeconds } from './utils/dateFromSeconds'
import { getStripeUpcomingInvoice } from './utils/stripe'

export default authedProcedure
  .input(
    yup.object().shape({
      orgId: yup.string().required(),
    })
  )
  .query(async (opts): Promise<UpcomingInvoice | null> => {
    const { orgId } = opts.input

    await guardOrg(orgId, Member_Role_Enum.Owner, opts.ctx)

    const orgSubscription = await adminRequest(GET_ORG_SUBSCRIPTION, { orgId })
    const stripeSubscriptionId =
      orgSubscription?.org_subscription[0]?.stripeSubscriptionId
    const stripeCustomerId =
      orgSubscription?.org_subscription[0]?.stripeCustomerId

    if (!stripeSubscriptionId || !stripeCustomerId) {
      throw new TRPCError({ code: 'NOT_FOUND' })
    }

    // Get stripe invoices
    const stripeUpcomingInvoice =
      await getStripeUpcomingInvoice(stripeSubscriptionId)

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
