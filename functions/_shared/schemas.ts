import { Member_Role_Enum, Subscription_Plan_Type_Enum } from '@gql'
import * as yup from 'yup'

export const nameSchema = yup.string().min(1)

export const emailSchema = yup.string().email()

export const slugSchema = yup
  .string()
  .min(5)
  .max(30)
  .test(
    'Slug',
    'Slug must be lowercase and contain only letters, numbers and dashes',
    (slug = '') => /^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)
  )

export const roleSchema = yup.string().oneOf(Object.values(Member_Role_Enum))

export const billingDetailsSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().optional(),
  address: yup.object().shape({
    city: yup.string().required(),
    country: yup.string().required(),
    line1: yup.string().required(),
    line2: yup.string().optional().nullable(),
    postal_code: yup.string().required(),
    state: yup.string().optional().nullable(),
  }),
})

export const subscriptionPlanTypeSchema = yup
  .mixed<Subscription_Plan_Type_Enum>()
  .oneOf(Object.values(Subscription_Plan_Type_Enum))
  .required()
