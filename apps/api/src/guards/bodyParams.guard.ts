import * as yup from 'yup'
import { ObjectShape } from 'yup/lib/object'
import { FunctionContext } from './getContext'
import { RouteError } from './route'

export function bodyParamsGuard<Shape extends ObjectShape>(
  context: FunctionContext,
  schema: yup.ObjectSchema<Shape>
) {
  try {
    return schema.validateSync(context.req.body)
  } catch (error) {
    throw new RouteError(400, 'Bad request')
  }
}
