import * as yup from 'yup'

export const nameSchema = yup.string().required().min(3)
export const emailSchema = yup.string().email().required()
