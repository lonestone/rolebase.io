import { gql, Member_Role_Enum } from '@gql'
import { CustomerBillingDetails } from '@shared/model/subscription'
import { billingDetailsSchema } from '@shared/schemas'
import { adminRequest } from '@utils/adminRequest'
import { getMemberById } from '@utils/getMemberById'
import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { guardOrg } from '@utils/guardOrg'
import { route, RouteError } from '@utils/route'
import { updateStripeCustomer } from '@utils/stripe'
import * as yup from 'yup'

const yupSchema = yup.object().shape({
  memberId: yup.string().required(),
  orgId: yup.string().required(),
  billingDetails: billingDetailsSchema.required(),
})

export default route(async (context): Promise<CustomerBillingDetails> => {
  guardAuth(context)
  const { memberId, orgId, billingDetails } = guardBodyParams(
    context,
    yupSchema
  )

  // Get member
  const member = await getMemberById(memberId)
  const org = await adminRequest(GET_ORG, { orgId })
  if (!member || !org || !billingDetails) {
    throw new RouteError(400, 'Invalid request')
  }

  await guardOrg(context, member.orgId, Member_Role_Enum.Owner)

  const orgSubscription = await adminRequest(GET_ORG_SUBSCRIPTION_CUSTOMERID, {
    orgId,
  })
  const stripeCustomerId =
    orgSubscription?.org_subscription[0]?.stripeCustomerId

  if (!stripeCustomerId) {
    throw new RouteError(400, 'Invalid request')
  }

  await updateStripeCustomer(stripeCustomerId, { ...billingDetails })

  return billingDetails
})
const GET_ORG = gql(`
    query getOrgById($orgId: uuid!) {
      org_by_pk(id: $orgId) {
        id
      }
    }`)

const GET_ORG_SUBSCRIPTION_CUSTOMERID = gql(`
    query getOrgSubscriptionStripeCustomerId($orgId: uuid!) {
      org_subscription(where: {orgId: {_eq: $orgId}}) {
        id
        stripeCustomerId
      }
    }`)