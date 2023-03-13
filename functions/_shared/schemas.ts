import {
  Member_Role_Enum,
  Member_Scope_Enum,
  Subscription_Plan_Type_Enum,
} from '@gql'
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

export const addressSchema = yup
  .object()
  .shape({
    city: yup.string().required(),
    country: yup.string().required(),
    line1: yup.string().required(),
    line2: yup.string().nullable(),
    postal_code: yup.string().required(),
    state: yup.string().nullable(),
  })
  .required()

export const billingDetailsSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().optional(),
  address: addressSchema,
})

export const subscriptionPlanTypeSchema = yup
  .mixed<Subscription_Plan_Type_Enum>()
  .oneOf(Object.values(Subscription_Plan_Type_Enum))
  .required()

export const stepsConfigSchema = yup.array().of(
  yup.object().shape({
    title: yup.string().required(),
  })
)

const updateMeetingCommonShape = {
  circleId: yup.string(),
  startDate: yup.string(),
  duration: yup.number(),
  stepsConfig: stepsConfigSchema,
  videoConf: yup.string().nullable(),
  archived: yup.boolean(),
  currentStepId: yup.string(),
  endDate: yup.string(),
  participantsMembersIds: yup.array().of(yup.string()),
  participantsScope: yup
    .mixed<Member_Scope_Enum>()
    .oneOf(Object.values(Member_Scope_Enum)),
}

export const updateMeetingSchema = yup.object().shape({
  ...updateMeetingCommonShape,
  title: nameSchema,
  attendees: yup.array().of(yup.string()),
})
