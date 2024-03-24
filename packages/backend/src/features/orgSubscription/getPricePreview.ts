import { PricePreview } from '@rolebase/shared/model/subscription'
import {
  addressSchema,
  subscriptionPlanTypeSchema,
} from '@rolebase/shared/schemas'
import * as yup from 'yup'
import { Member_Role_Enum } from '../../gql'
import { guardOrg } from '../../guards/guardOrg'
import { authedProcedure } from '../../trpc/authedProcedure'
import { getOrgSubscriptionAndActiveMembers } from './utils/getOrgSubscriptionAndActiveMembers'
import { getPlanTypePriceId } from './utils/getPlanTypePriceId'
import { setNullValuesToUndefined } from './utils/setNullValuesToUndefined'
import { getPricePreview } from './utils/stripe'

export default authedProcedure
  .input(
    yup.object().shape({
      orgId: yup.string().required(),
      promotionCode: yup.string().nullable(),
      address: addressSchema.required(),
      planType: subscriptionPlanTypeSchema,
    })
  )
  .query(async (opts): Promise<PricePreview> => {
    const { orgId, promotionCode, address, planType } = opts.input

    await guardOrg(orgId, Member_Role_Enum.Owner, opts.ctx)

    const { activeMembers } = await getOrgSubscriptionAndActiveMembers(orgId)

    // TODO: retrieve priceId and quantity
    const { coupon, price } = await getPricePreview(
      getPlanTypePriceId(planType),
      activeMembers,
      setNullValuesToUndefined(address),
      promotionCode
    )

    const { lines, total_tax_amounts } = price

    return {
      subTotalPerSeatInCents: lines.data[0]?.price?.unit_amount ?? 0,
      quantity: lines.data[0]?.quantity ?? 0,
      promotionCode: coupon
        ? {
            id: coupon.coupon.id,
            amountOff: coupon.coupon.amount_off,
            duration: {
              type: coupon.coupon.duration,
              durationInMonth: coupon.coupon.duration_in_months,
            },
            name: coupon.coupon.name ?? '',
            percentOff: coupon.coupon.percent_off,
            restrictions: {
              ...coupon.restrictions,
            },
          }
        : null,
      tax:
        typeof total_tax_amounts[0]?.tax_rate !== 'string'
          ? {
              percentage: total_tax_amounts[0]?.tax_rate.percentage,
              amount: total_tax_amounts[0]?.amount,
            }
          : null,
    }
  })
