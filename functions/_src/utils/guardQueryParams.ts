import * as yup from 'yup'
import { FunctionContext } from './getContext'
import { RouteError } from './route'

export function guardQueryParams<Schema extends yup.ObjectSchema<any>>(
  context: FunctionContext,
  schema: Schema
) {
  try {
    return schema.validateSync(context.req.query)
  } catch (error) {
    throw new RouteError(400, 'Bad request')
  }
}
