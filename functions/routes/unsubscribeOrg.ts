import { gql, Member_Role_Enum } from '@gql'
import { adminRequest } from '@utils/adminRequest'
import { dateFromSeconds } from '@utils/dateFromSeconds'
import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { guardOrg } from '@utils/guardOrg'
import { isSubscriptionActive } from '@utils/isSubscriptionActive'
import { route, RouteError } from '@utils/route'
import { cancelStripeSubscription } from '@utils/stripe'
import * as yup from 'yup'

const yupSchema = yup.object().shape({
  orgId: yup.string().required(),
})

export default route(async (context): Promise<{ cancelAt: Date }> => {
  guardAuth(context)
  const { orgId } = guardBodyParams(context, yupSchema)

  await guardOrg(orgId, Member_Role_Enum.Owner, context.userId)

  const orgSubscriptionResponse = await adminRequest(GET_ORG_SUBSCRIPTION, {
    orgId,
  })
  const orgSubscription = orgSubscriptionResponse?.org_subscription[0]
  const stripeSubscriptionId = orgSubscription?.stripeSubscriptionId

  if (!stripeSubscriptionId || !isSubscriptionActive(orgSubscription?.status)) {
    throw new RouteError(400, 'Subscription already cancelled')
  }

  // Expires the subscription when period end
  const subscription = await cancelStripeSubscription(stripeSubscriptionId)

  return { cancelAt: dateFromSeconds(subscription.cancel_at ?? 0) }
})

const GET_ORG_SUBSCRIPTION = gql(`
    query getOrgSubscriptionStripeId($orgId: uuid!) {
      org_subscription(where: {orgId: {_eq: $orgId}}) {
        id
        stripeSubscriptionId
        status
      }
    }`)
