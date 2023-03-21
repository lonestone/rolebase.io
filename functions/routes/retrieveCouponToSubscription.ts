import { Member_Role_Enum } from '@gql'
import { PromotionCode } from '@shared/model/subscription'
import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { guardOrg } from '@utils/guardOrg'
import { route, RouteError } from '@utils/route'
import { retrievePromotionCode } from '@utils/stripe'
import * as yup from 'yup'

const yupSchema = yup.object().shape({
  orgId: yup.string().required(),
  promotionCode: yup.string().required(),
  // https://stripe.com/docs/billing/taxes/collect-taxes
})

export default route(async (context): Promise<PromotionCode> => {
  guardAuth(context)
  const { orgId, promotionCode } = guardBodyParams(context, yupSchema)

  if (!orgId || !promotionCode) {
    throw new RouteError(400, 'Invalid request')
  }

  await guardOrg(orgId, Member_Role_Enum.Owner, context.userId)

  const res = await retrievePromotionCode(promotionCode)

  return {
    id: res.code,
    restrictions: res.restrictions,
    duration: {
      type: res.coupon.duration,
      durationInMonth: res.coupon.duration_in_months,
    },
    name: res.coupon.name,
    amountOff: res.coupon.amount_off,
    percentOff: res.coupon.percent_off,
  }
})
