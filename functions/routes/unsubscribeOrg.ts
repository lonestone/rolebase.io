import { gql, Member_Role_Enum } from '@gql'
import { adminRequest } from '@utils/adminRequest'
import { getMemberById } from '@utils/getMemberById'
import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { guardOrg } from '@utils/guardOrg'
import { isSubscriptionActive } from '@utils/isSubscriptionActive'
import { route, RouteError } from '@utils/route'
import { cancelStripeSubscription } from '@utils/stripe'
import { toDateTime } from '@utils/toDateTime'
import * as yup from 'yup'

const yupSchema = yup.object().shape({
  memberId: yup.string().required(),
  orgId: yup.string().required(),
})

export default route(async (context): Promise<{ cancelAt: Date }> => {
  guardAuth(context)
  const { memberId, orgId } = guardBodyParams(context, yupSchema)

  // Get member
  const member = await getMemberById(memberId)
  const org = await adminRequest(GET_ORG, { orgId })
  if (!member || !org) {
    throw new RouteError(400, 'Invalid request')
  }

  await guardOrg(context, member.orgId, Member_Role_Enum.Owner)

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

  return { cancelAt: toDateTime(subscription.cancel_at ?? 0) }
})

const GET_ORG = gql(`
    query getOrgById($orgId: uuid!) {
      org_by_pk(id: $orgId) {
        id
      }
    }`)

const GET_ORG_SUBSCRIPTION = gql(`
    query getOrgSubscriptionStripeId($orgId: uuid!) {
      org_subscription(where: {orgId: {_eq: $orgId}}) {
        id
        stripeSubscriptionId
        status
      }
    }`)
