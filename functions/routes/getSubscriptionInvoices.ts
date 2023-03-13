import { gql, Member_Role_Enum } from '@gql'
import { Invoice, InvoiceStatus } from '@shared/model/subscription'
import { adminRequest } from '@utils/adminRequest'
import { dateFromSeconds } from '@utils/dateFromSeconds'
import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { guardOrg } from '@utils/guardOrg'
import { route } from '@utils/route'
import { getStripeCustomerInvoices } from '@utils/stripe'
import Stripe from 'stripe'
import * as yup from 'yup'

const yupSchema = yup.object().shape({
  orgId: yup.string().required(),
})

export default route(async (context): Promise<Invoice[]> => {
  guardAuth(context)
  const { orgId } = guardBodyParams(context, yupSchema)

  await guardOrg(context, orgId, Member_Role_Enum.Owner)

  const orgSubscription = await adminRequest(GET_ORG_SUBSCRIPTION, { orgId })
  const stripeSubscriptionId =
    orgSubscription?.org_subscription[0]?.stripeSubscriptionId
  const stripeCustomerId =
    orgSubscription?.org_subscription[0]?.stripeCustomerId

  if (!stripeSubscriptionId || !stripeCustomerId) {
    return []
  }

  // Get stripe invoices
  const invoices = await getStripeCustomerInvoices(stripeCustomerId)

  return formatStripeInvoices(invoices)
})

const formatStripeInvoices = (
  stripeInvoicesList: Stripe.ApiList<Stripe.Invoice>
): Invoice[] => {
  const stripeInvoices = stripeInvoicesList.data
  const invoices: Invoice[] = []

  for (const stripeInvoice of stripeInvoices) {
    invoices.push({
      createdAt: dateFromSeconds(stripeInvoice.created),
      pdfUrl: stripeInvoice.invoice_pdf,
      totalInCents: stripeInvoice.total,
      status: stripeInvoice.status as InvoiceStatus,
    })
  }

  return invoices
}

const GET_ORG_SUBSCRIPTION = gql(`
    query getOrgSubscriptionStripeIds($orgId: uuid!) {
      org_subscription(where: {orgId: {_eq: $orgId}}) {
        id
        stripeSubscriptionId
        stripeCustomerId
      }
    }`)
