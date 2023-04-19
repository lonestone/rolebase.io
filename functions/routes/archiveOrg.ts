import { gql, Member_Role_Enum } from '@gql'
import { adminRequest } from '@utils/adminRequest'
import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { guardOrg } from '@utils/guardOrg'
import { route } from '@utils/route'
import { deleteStripeSubscription } from '@utils/stripe'
import * as yup from 'yup'

const yupSchema = yup.object().shape({
  orgId: yup.string().required(),
})

export default route(async (context): Promise<string> => {
  guardAuth(context)
  const { orgId } = guardBodyParams(context, yupSchema)

  await guardOrg(orgId, Member_Role_Enum.Owner, context)

  const orgSubscription = await adminRequest(GET_ORG_SUBSCRIPTION, { orgId })
  const stripeSubscriptionId =
    orgSubscription?.org_subscription[0]?.stripeSubscriptionId

  if (stripeSubscriptionId) {
    await deleteStripeSubscription(stripeSubscriptionId)
  }

  await adminRequest(ARCHIVE_ORG, { orgId })

  return orgId
})

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
    }
  }`)
