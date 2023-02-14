import { gql } from '@gql'
import { adminRequest } from '@utils/adminRequest'
import { getActiveMembersTotal } from '@utils/getActiveMembersTotal'
import { updateStripeSubscription } from '@utils/stripe'
import { FunctionContext } from './getContext'
import { RouteError } from './route'

export async function updateOrgSubscriptionAfterArchive(
  context: FunctionContext,
  orgId: string
) {
  if (!context.userId) {
    throw new RouteError(401, 'Unauthorized')
  }

  const orgSubscriptionResponse = await adminRequest(GET_ORG_SUBSCRIPTION, {
    orgId,
  })
  const orgSubscription = orgSubscriptionResponse.org_subscription?.length
    ? orgSubscriptionResponse.org_subscription[0]
    : null

  const nbActiveMembers = await getActiveMembersTotal(context, orgId)

  if (orgSubscription) {
    await updateStripeSubscription(
      orgSubscription.stripeSubscriptionId,
      nbActiveMembers - 1
    )
  }

  return orgId
}

export const GET_ORG_SUBSCRIPTION = gql(`
  query getOrgSubscriptionSubId($orgId: uuid!) {
    org_subscription(where: {orgId: {_eq: $orgId}}) {
      id
      stripeSubscriptionId
    }
  }`)
