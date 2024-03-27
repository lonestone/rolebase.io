import { TRPCError } from '@trpc/server'
import * as yup from 'yup'
import { gql, Member_Role_Enum } from '../../gql'
import { guardOrg } from '../../guards/guardOrg'
import { authedProcedure } from '../../trpc/authedProcedure'
import { adminRequest } from '../../utils/adminRequest'
import {
  getStripeSubscriptionFromSubscriptionId,
  stripeResumeSubscription,
} from './utils/stripe'

export default authedProcedure
  .input(
    yup.object().shape({
      orgId: yup.string().required(),
    })
  )
  .mutation(async (opts): Promise<void> => {
    const { orgId } = opts.input

    await guardOrg(orgId, Member_Role_Enum.Owner, opts.ctx)

    const orgSubscription = await adminRequest(GET_ORG_SUBSCRIPTION, { orgId })
    const stripeSubscriptionId =
      orgSubscription?.org_subscription[0]?.stripeSubscriptionId
    const stripeCustomerId =
      orgSubscription?.org_subscription[0]?.stripeCustomerId

    if (!stripeSubscriptionId || !stripeCustomerId) {
      throw new TRPCError({ code: 'NOT_FOUND' })
    }

    const stripeSubscription =
      await getStripeSubscriptionFromSubscriptionId(stripeSubscriptionId)

    // If the subscription is not cancelled, we don't need to resume it
    if (!stripeSubscription.cancel_at) {
      return
    }

    await stripeResumeSubscription(stripeSubscription.id)
  })

const GET_ORG_SUBSCRIPTION = gql(`
    query getOrgSubscriptionStripeIds($orgId: uuid!) {
      org_subscription(where: {orgId: {_eq: $orgId}}) {
        id
        stripeSubscriptionId
        stripeCustomerId
      }
    }`)
