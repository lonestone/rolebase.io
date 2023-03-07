import { gql, Member_Role_Enum } from '@gql'
import { adminRequest } from '@utils/adminRequest'
import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { guardOrg } from '@utils/guardOrg'
import { route, RouteError } from '@utils/route'
import { createStripeSetupIntent } from '@utils/stripe'
import * as yup from 'yup'

const yupSchema = yup.object().shape({
  orgId: yup.string().required(),
})

export default route(async (context): Promise<{ clientSecret: string }> => {
  guardAuth(context)
  const { orgId } = guardBodyParams(context, yupSchema)

  await guardOrg(context, orgId, Member_Role_Enum.Owner)

  const orgSubscription = await adminRequest(GET_ORG_SUBSCRIPTION_CUSTOMERID, {
    orgId,
  })
  const stripeCustomerId =
    orgSubscription?.org_subscription[0]?.stripeCustomerId

  if (!stripeCustomerId) {
    throw new RouteError(400, 'Invalid request')
  }

  const intent = await createStripeSetupIntent(stripeCustomerId)

  return {
    clientSecret: intent.client_secret!,
  }
})

const GET_ORG_SUBSCRIPTION_CUSTOMERID = gql(`
    query getOrgSubscriptionStripeCustomerId($orgId: uuid!) {
      org_subscription(where: {orgId: {_eq: $orgId}}) {
        id
        stripeCustomerId
      }
    }`)
