import { gql, Member_Role_Enum, Subscription_Payment_Status_Enum } from '@gql'
import { adminRequest, adminRestRequest } from '@utils/adminRequest'
import { getMemberById } from '@utils/getMemberById'
import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { guardOrg } from '@utils/guardOrg'
import { route, RouteError } from '@utils/route'
import { cancelStripeSubscription } from '@utils/stripe'
import * as yup from 'yup'

type ArchiveOrgResponse = {
  id: string
  archiveAt: Date | null
}

const yupSchema = yup.object().shape({
  memberId: yup.string().required(),
  orgId: yup.string().required(),
})

export default route(async (context): Promise<ArchiveOrgResponse> => {
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
  let stripeSubscriptionStatus = orgSubscription?.org_subscription[0]?.status
  let archiveAt: Date | null = null

  if (
    stripeSubscriptionId &&
    // TODO: util isSubscriptionActive
    (stripeSubscriptionStatus === Subscription_Payment_Status_Enum.Active ||
      stripeSubscriptionStatus === Subscription_Payment_Status_Enum.Trialing)
  ) {
    const stripeSubscription = await cancelStripeSubscription(
      stripeSubscriptionId
    )

    archiveAt = toDateTime((stripeSubscription.cancel_at ?? 0) + 60)

    await adminRestRequest('/v1/metadata', {
      type: 'create_scheduled_event',
      args: {
        webhook: `${process.env.NHOST_FUNCTIONS_URL}/routes/archiveOrg`,
        schedule_at: archiveAt, // Triggered one minute after subscription ends
        payload: {
          orgId,
          memberId,
        },
      },
    })
  }

  await adminRequest(ARCHIVE_ORG, { orgId })

  return { id: orgId, archiveAt }
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
    query getOrgSubscriptionStripeStatus($orgId: uuid!) {
      org_subscription(where: {orgId: {_eq: $orgId}}) {
        id
        stripeSubscriptionId
        status
      }
    }`)

const ARCHIVE_ORG = gql(`
    mutation archiveOrg($orgId: uuid!) {
      update_org_by_pk(pk_columns: {id: $orgId}, _set: {archived: true}) {
        id
        stripeSubscriptionId
      }
    }`)
