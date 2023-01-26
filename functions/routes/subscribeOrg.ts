import { gql, Member_Role_Enum } from '@gql'
import { adminRequest } from '@utils/adminRequest'
import { getMemberById } from '@utils/getMemberById'
import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { guardOrg } from '@utils/guardOrg'
import { route, RouteError } from '@utils/route'
import * as yup from 'yup'

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

const yupSchema = yup.object().shape({
  memberId: yup.string().required(),
  orgId: yup.string().required(),
})

type SubscriptionIntent = {
  subscriptionId: string
  clientSecret: string
}

export default route(async (context): Promise<SubscriptionIntent> => {
  guardAuth(context)
  const { memberId, orgId } = guardBodyParams(context, yupSchema)

  // Get member
  const member = await getMemberById(memberId)
  const org = await adminRequest(GET_ORG, { orgId })

  if (!member || !org) {
    throw new RouteError(400, 'Invalid request')
  }

  await guardOrg(context, member.orgId, Member_Role_Enum.Owner)

  // Should check if org has already a customerId then use it, otherwise create a new one
  const { id: customerId } = await createCustomer()

  const priceId = 'price_1MUWojFbDx5R7pId7yJFun1L' // retrieve it from sub plan
  const quantity = 5 // Number of active members inside the org

  // Create a new subscription with the 'incomplete' status
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [
      {
        price: priceId,
        quantity,
      },
    ],
    payment_behavior: 'default_incomplete',
    payment_settings: { save_default_payment_method: 'on_subscription' },
    expand: ['latest_invoice.payment_intent'],
  })

  console.log('Subscription:', subscription)

  const subscriptionId = subscription.id
  const clientSecret = subscription.latest_invoice.payment_intent.client_secret

  return {
    subscriptionId,
    clientSecret,
  }
})

const GET_ORG = gql(`
  query getOrg($orgId: uuid!) {
    org_by_pk(id: $orgId) {
      id
      members {
        role
      }
    }
  }`)

const createCustomer = async () => {
  // Required fields that will need to be retrieved
  const email = 'noe@lonestone.io'
  const name = 'Noé'

  const customer = await stripe.customers.create({
    email,
    name,
  })

  return customer
}
