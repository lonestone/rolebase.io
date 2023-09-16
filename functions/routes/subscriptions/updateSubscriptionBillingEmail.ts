import { gql, Member_Role_Enum } from '@gql'
import { emailSchema } from '@shared/schemas'
import { adminRequest } from '@utils/adminRequest'
import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { guardOrg } from '@utils/guardOrg'
import { route, RouteError } from '@utils/route'
import { updateStripeCustomer } from '@utils/stripe'
import * as yup from 'yup'

const yupSchema = yup.object().shape({
  orgId: yup.string().required(),
  email: emailSchema.required(),
})

export default route(async (context): Promise<string> => {
  guardAuth(context)
  const { orgId, email } = guardBodyParams(context, yupSchema)

  if (!email) {
    throw new RouteError(400, 'Invalid request')
  }

  await guardOrg(orgId, Member_Role_Enum.Owner, context)

  const orgSubscription = await adminRequest(GET_ORG_SUBSCRIPTION_CUSTOMERID, {
    orgId,
  })
  const stripeCustomerId =
    orgSubscription?.org_subscription[0]?.stripeCustomerId

  if (!stripeCustomerId) {
    throw new RouteError(400, 'Invalid request')
  }

  await updateStripeCustomer(stripeCustomerId, { email })

  return email
})

const GET_ORG_SUBSCRIPTION_CUSTOMERID = gql(`
    query getOrgSubscriptionStripeCustomerId($orgId: uuid!) {
      org_subscription(where: {orgId: {_eq: $orgId}}) {
        id
        stripeCustomerId
      }
    }`)
