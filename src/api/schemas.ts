import * as yup from 'yup'

export const nameSchema = yup.string().required().min(1)
export const emailSchema = yup.string().email().required()
export const slugSchema = yup
  .string()
  .min(6)
  .max(30)
  .test(
    'Slug',
    'Slug must be lowercase and contain only letters, numbers and dashes',
    (slug = '') => /^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)
  )
