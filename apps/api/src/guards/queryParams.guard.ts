import { FunctionContext } from '@utils/getContext'
import { RouteError } from '@utils/route'
import * as yup from 'yup'
import { ObjectShape } from 'yup/lib/object'


export function queryParamsGuard<Shape extends ObjectShape>(
  context: FunctionContext,
  schema: yup.ObjectSchema<Shape>
) {
  try {
    return schema.validateSync(context.req.query)
  } catch (error) {
    throw new RouteError(400, 'Bad request')
  }
}
