import { gql, Member_Role_Enum } from '@gql'
import { PromotionCode } from '@shared/model/subscription'
import { getMemberById } from '@utils/getMemberById'
import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { guardOrg } from '@utils/guardOrg'
import { route, RouteError } from '@utils/route'
import { retrievePromotionCode } from '@utils/stripe'
import * as yup from 'yup'

const yupSchema = yup.object().shape({
  memberId: yup.string().required(),
  orgId: yup.string().required(),
  promotionCode: yup.string().required(),
})

export default route(async (context): Promise<PromotionCode> => {
  guardAuth(context)
  const { memberId, orgId, promotionCode } = guardBodyParams(context, yupSchema)

  // Get member
  const member = await getMemberById(memberId)

  if (!member || !orgId || !promotionCode) {
    throw new RouteError(400, 'Invalid request')
  }

  await guardOrg(context, member.orgId, Member_Role_Enum.Owner)

  const res = await retrievePromotionCode(promotionCode)

  return {
    id: res.code,
    restrictions: res.restrictions,
    name: res.coupon.name,
    amountOff: res.coupon.amount_off,
    percentOff: res.coupon.percent_off,
  }
})

const GET_ORG_SUBSCRIPTION = gql(`
  query getOrgSubscriptionStatus($orgId: uuid!) {
    org_subscription(where: {orgId: {_eq: $orgId}}) {
      id
      status
      stripeCustomerId
      stripeSubscriptionId
      type
    }
  }`)
