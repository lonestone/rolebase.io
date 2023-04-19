import { FunctionContext } from './getContext'
import { RouteError } from './route'

export function guardUserId(context: FunctionContext): string {
  if (!context.userId) {
    throw new RouteError(401, 'Unauthorized')
  }

  return context.userId
}
