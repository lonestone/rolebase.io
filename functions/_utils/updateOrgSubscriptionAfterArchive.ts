import { gql } from '@gql'
import { adminRequest } from '@utils/adminRequest'
import { getActiveMembersTotal } from '@utils/getActiveMembersTotal'
import { guardAuth } from '@utils/guardAuth'
import { isSubscriptionActive } from '@utils/isSubscriptionActive'
import { updateStripeSubscription } from '@utils/stripe'
import { FunctionContext } from './getContext'

export async function updateOrgSubscriptionAfterArchive(
  context: FunctionContext,
  orgId: string
) {
  guardAuth(context)

  const orgSubscriptionResponse = await adminRequest(GET_ORG_SUBSCRIPTION, {
    orgId,
  })
  const orgSubscription = orgSubscriptionResponse.org_subscription?.length
    ? orgSubscriptionResponse.org_subscription[0]
    : null

  const nbActiveMembers = await getActiveMembersTotal(context, orgId)

  if (orgSubscription && isSubscriptionActive(orgSubscription.status)) {
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
      status
    }
  }`)
