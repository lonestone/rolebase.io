import { gql } from '@gql'
import { adminRequest } from '@utils/adminRequest'
import { guardAuth } from '@utils/guardAuth'
import { isSubscriptionActive } from '@utils/isSubscriptionActive'
import { updateStripeSubscription } from '@utils/stripe'
import { FunctionContext } from './getContext'

export async function updateOrgSubscriptionAfterArchive(
  context: FunctionContext,
  orgId: string
) {
  guardAuth(context)

  const orgSubscriptionResponse = await adminRequest(
    GET_ORG_SUB_WITH_ACTIVE_MEMBERS,
    {
      orgId,
    }
  )
  const org = orgSubscriptionResponse.org_by_pk
  const orgSubscription = org?.org_subscription

  if (orgSubscription && isSubscriptionActive(orgSubscription.status)) {
    await updateStripeSubscription(
      orgSubscription.stripeSubscriptionId!,
      org.members.length - 1
    )
  }

  return orgId
}

const GET_ORG_SUB_WITH_ACTIVE_MEMBERS = gql(`
  query getOrgActiveMembers($orgId: uuid!) {
    org_by_pk(id: $orgId) {
      members(where: {userId: {_is_null: false}}) {
        id
      }
      org_subscription {
        id
        stripeSubscriptionId
        status
      }
    }
  }
`)
