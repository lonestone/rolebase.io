import { TRPCError } from '@trpc/server'
import * as yup from 'yup'
import { gql, Member_Role_Enum } from '../../gql'
import { guardOrg } from '../../guards/guardOrg'
import { authedProcedure } from '../../trpc/authedProcedure'
import { adminRequest } from '../../utils/adminRequest'
import { dateFromSeconds } from './utils/dateFromSeconds'
import { isSubscriptionActive } from '@rolebase/shared/model/subscription'
import { cancelStripeSubscription } from './utils/stripe'

export default authedProcedure
  .input(
    yup.object().shape({
      orgId: yup.string().required(),
    })
  )
  .mutation(async (opts): Promise<{ cancelAt: string }> => {
    const { orgId } = opts.input

    await guardOrg(orgId, Member_Role_Enum.Owner, opts.ctx)

    const orgSubscriptionResponse = await adminRequest(GET_ORG_SUBSCRIPTION, {
      orgId,
    })
    const orgSubscription = orgSubscriptionResponse?.org_subscription[0]
    const stripeSubscriptionId = orgSubscription?.stripeSubscriptionId

    if (
      !stripeSubscriptionId ||
      !isSubscriptionActive(orgSubscription?.status)
    ) {
      throw new TRPCError({ code: 'NOT_FOUND' })
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
