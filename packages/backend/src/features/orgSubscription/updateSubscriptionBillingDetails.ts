import { CustomerBillingDetails } from '@rolebase/shared/model/subscription'
import { billingDetailsSchema } from '@rolebase/shared/schemas'
import { TRPCError } from '@trpc/server'
import * as yup from 'yup'
import { gql, Member_Role_Enum } from '../../gql'
import { guardOrg } from '../../guards/guardOrg'
import { authedProcedure } from '../../trpc/authedProcedure'
import { adminRequest } from '../../utils/adminRequest'
import { setNullValuesToUndefined } from './utils/setNullValuesToUndefined'
import { updateStripeCustomer } from './utils/stripe'

export default authedProcedure
  .input(
    yup.object().shape({
      orgId: yup.string().required(),
      billingDetails: billingDetailsSchema.required(),
    })
  )
  .mutation(async (opts): Promise<CustomerBillingDetails> => {
    const { orgId, billingDetails } = opts.input

    const details = setNullValuesToUndefined({
      ...billingDetails,
      address: billingDetails.address && {
        ...setNullValuesToUndefined(billingDetails.address),
      },
    })

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

    await updateStripeCustomer(stripeCustomerId, details)

    return details
  })

const GET_ORG_SUBSCRIPTION_CUSTOMERID = gql(`
    query getOrgSubscriptionStripeCustomerId($orgId: uuid!) {
      org_subscription(where: {orgId: {_eq: $orgId}}) {
        id
        stripeCustomerId
      }
    }`)
