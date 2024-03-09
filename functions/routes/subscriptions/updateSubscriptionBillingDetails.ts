import { gql, Member_Role_Enum } from '@gql'
import { CustomerBillingDetails } from '@shared/model/subscription'
import { billingDetailsSchema } from '@shared/schemas'
import { adminRequest } from '@utils/adminRequest'
import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { guardOrg } from '@utils/guardOrg'
import { route, RouteError } from '@utils/route'
import { setNullValuesToUndefined } from '@utils/setNullValuesToUndefined'
import { updateStripeCustomer } from '@utils/stripe'
import * as yup from 'yup'

const yupSchema = yup.object().shape({
  orgId: yup.string().required(),
  billingDetails: billingDetailsSchema.required(),
})

export default route(async (context): Promise<CustomerBillingDetails> => {
  guardAuth(context)
  const { orgId, billingDetails } = guardBodyParams(context, yupSchema)

  const details = setNullValuesToUndefined({
    ...billingDetails,
    address: { ...setNullValuesToUndefined(billingDetails.address) },
  })

  await guardOrg(orgId, Member_Role_Enum.Owner, context)

  const orgSubscription = await adminRequest(GET_ORG_SUBSCRIPTION_CUSTOMERID, {
    orgId,
  })
  const stripeCustomerId =
    orgSubscription?.org_subscription[0]?.stripeCustomerId

  if (!stripeCustomerId) {
    throw new RouteError(400, 'Invalid request')
  }

  await updateStripeCustomer(stripeCustomerId, details)

  return details
})

const GET_ORG_SUBSCRIPTION_CUSTOMERID = gql(`
    query getOrgSubscriptionStripeCustomerId($orgId: uuid!) {
      org_subscription(where: {orgId: {_eq: $orgId}}) {
        id
        stripeCustomerId
      }
    }`)
