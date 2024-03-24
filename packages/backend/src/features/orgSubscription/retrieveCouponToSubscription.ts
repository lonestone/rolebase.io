import { PromotionCode } from '@rolebase/shared/model/subscription'
import * as yup from 'yup'
import { Member_Role_Enum } from '../../gql'
import { guardOrg } from '../../guards/guardOrg'
import { authedProcedure } from '../../trpc/authedProcedure'
import { retrievePromotionCode } from './utils/stripe'

export default authedProcedure
  .input(
    yup.object().shape({
      orgId: yup.string().required(),
      promotionCode: yup.string().required(),
      // https://stripe.com/docs/billing/taxes/collect-taxes
    })
  )
  .mutation(async (opts): Promise<PromotionCode> => {
    const { orgId, promotionCode } = opts.input

    await guardOrg(orgId, Member_Role_Enum.Owner, opts.ctx)

    const res = await retrievePromotionCode(promotionCode)

    return {
      id: res.code,
      restrictions: res.restrictions,
      duration: {
        type: res.coupon.duration,
        durationInMonth: res.coupon.duration_in_months,
      },
      name: res.coupon.name || '',
      amountOff: res.coupon.amount_off,
      percentOff: res.coupon.percent_off,
    }
  })
