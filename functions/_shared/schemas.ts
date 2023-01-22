import { Member_Role_Enum } from '@gql'
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
