import * as yup from 'yup'
import { Member_Role_Enum, Subscription_Plan_Type_Enum } from './gql'

export const nameSchema = yup.string().min(1)
export const emailSchema = yup.string().email()
export const phoneSchema = yup.string().matches(/^\+?[\d\s\-().]{7,20}$/)
export const passwordSchema = yup.string().min(8)

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

export const addressSchema = yup.object().shape({
  city: yup.string().nullable().default(null),
  country: yup.string().nullable().default(null),
  line1: yup.string().nullable().default(null),
  line2: yup.string().nullable().default(null),
  postal_code: yup.string().nullable().default(null),
  state: yup.string().nullable().default(null),
})

export const billingDetailsSchema = yup.object().shape({
  name: yup.string().nullable(),
  email: yup.string().nullable(),
  address: addressSchema.nullable().optional(),
})

export const subscriptionPlanTypeSchema = yup
  .mixed<Subscription_Plan_Type_Enum>()
  .oneOf(Object.values(Subscription_Plan_Type_Enum))
  .required()

export const stepsConfigSchema = yup
  .array()
  .of(
    yup.object().shape({
      title: yup.string().required(),
    })
  )
  .min(1)
