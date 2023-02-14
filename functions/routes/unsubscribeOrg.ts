import { gql, Member_Role_Enum } from '@gql'
import { adminRequest } from '@utils/adminRequest'
import { getMemberById } from '@utils/getMemberById'
import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { guardOrg } from '@utils/guardOrg'
import { route, RouteError } from '@utils/route'
import { cancelStripeSubscription } from '@utils/stripe'
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

  const orgSubscription = await adminRequest(GET_ORG_SUBSCRIPTION, { orgId })
  let stripeSubscriptionId =
    orgSubscription?.org_subscription[0]?.stripeSubscriptionId

  if (!stripeSubscriptionId) {
    throw new RouteError(400, 'Subscription already cancelled')
  }

  // Expires the subscription when period end
  const subscription = await cancelStripeSubscription(stripeSubscriptionId)

  return { cancelAt: toDateTime(subscription.cancel_at ?? 0) }
})

// TODO: util
const toDateTime = (secs: number): Date => {
  const t = new Date(1970, 0, 1) // Epoch
  t.setSeconds(secs)
  return t
}

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
      }
    }`)
