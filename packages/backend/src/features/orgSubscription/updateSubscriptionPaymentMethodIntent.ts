import { TRPCError } from '@trpc/server'
import * as yup from 'yup'
import { gql, Member_Role_Enum } from '../../gql'
import { guardOrg } from '../../guards/guardOrg'
import { authedProcedure } from '../../trpc/authedProcedure'
import { adminRequest } from '../../utils/adminRequest'
import { createStripeSetupIntent } from './utils/stripe'

export default authedProcedure
  .input(
    yup.object().shape({
      orgId: yup.string().required(),
    })
  )
  .mutation(async (opts): Promise<{ clientSecret: string }> => {
    const { orgId } = opts.input

    await guardOrg(orgId, Member_Role_Enum.Owner, opts.ctx)

    const orgSubscription = await adminRequest(
      GET_ORG_SUBSCRIPTION_CUSTOMERID,
      {
        orgId,
      }
    )
    const stripeCustomerId =
      orgSubscription?.org_subscription[0]?.stripeCustomerId

    if (!stripeCustomerId) {
      throw new TRPCError({ code: 'NOT_FOUND' })
    }

    const intent = await createStripeSetupIntent(stripeCustomerId)

    return {
      clientSecret: intent.client_secret!,
    }
  })

const GET_ORG_SUBSCRIPTION_CUSTOMERID = gql(`
    query getOrgSubscriptionStripeCustomerId($orgId: uuid!) {
      org_subscription(where: {orgId: {_eq: $orgId}}) {
        id
        stripeCustomerId
      }
    }`)
