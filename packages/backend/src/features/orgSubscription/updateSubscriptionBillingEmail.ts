import { emailSchema } from '@rolebase/shared/schemas'
import { TRPCError } from '@trpc/server'
import * as yup from 'yup'
import { gql, Member_Role_Enum } from '../../gql'
import { guardOrg } from '../../guards/guardOrg'
import { authedProcedure } from '../../trpc/authedProcedure'
import { adminRequest } from '../../utils/adminRequest'
import { updateStripeCustomer } from './utils/stripe'

export default authedProcedure
  .input(
    yup.object().shape({
      orgId: yup.string().required(),
      email: emailSchema.required(),
    })
  )
  .mutation(async (opts): Promise<string> => {
    const { orgId, email } = opts.input

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

    await updateStripeCustomer(stripeCustomerId, { email })

    return email
  })

const GET_ORG_SUBSCRIPTION_CUSTOMERID = gql(`
    query getOrgSubscriptionStripeCustomerId($orgId: uuid!) {
      org_subscription(where: {orgId: {_eq: $orgId}}) {
        id
        stripeCustomerId
      }
    }`)
