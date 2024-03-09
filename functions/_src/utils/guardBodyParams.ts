import * as yup from 'yup'
import { FunctionContext } from './getContext'
import { RouteError } from './route'

export function guardBodyParams<Schema extends yup.ObjectSchema<any>>(
  context: FunctionContext,
  schema: Schema
) {
  try {
    return schema.validateSync(context.req.body)
  } catch (error) {
    throw new RouteError(400, 'Bad request')
  }
}
