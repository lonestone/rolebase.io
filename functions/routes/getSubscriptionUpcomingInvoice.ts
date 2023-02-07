import { gql, Member_Role_Enum } from '@gql'
import { UpcomingInvoice } from '@shared/model/subscription'
import { adminRequest } from '@utils/adminRequest'
import { getMemberById } from '@utils/getMemberById'
import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { guardOrg } from '@utils/guardOrg'
import { route, RouteError } from '@utils/route'
import { getStripeUpcomingInvoice } from '@utils/stripe'
import Stripe from 'stripe'
import * as yup from 'yup'

const yupSchema = yup.object().shape({
  memberId: yup.string().required(),
  orgId: yup.string().required(),
})

export default route(async (context): Promise<UpcomingInvoice> => {
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

  if (!stripeSubscriptionId || !stripeCustomerId) {
    throw new RouteError(400, 'Invalid request')
  }

  // Get stripe invoices
  const stripeUpcomingInvoice = await getStripeUpcomingInvoice(
    stripeCustomerId,
    stripeSubscriptionId
  )

  return formatStripeUpcomingInvoice(stripeUpcomingInvoice)
})

const formatStripeUpcomingInvoice = (
  stripeUpcomingInvoice: Stripe.UpcomingInvoice
): UpcomingInvoice => {
  return {
    nextPayment: toDateTime(
      stripeUpcomingInvoice.next_payment_attempt ??
        stripeUpcomingInvoice.lines.data[0].period.end
    ),
    totalInCents: stripeUpcomingInvoice.total,
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
    query getOrgSubscriptionStripeIds($orgId: uuid!) {
      org_subscription(where: {orgId: {_eq: $orgId}}) {
        id
        stripeSubscriptionId
        stripeCustomerId
      }
    }`)
