import { FunctionContext } from './getContext'
import { RouteError } from './route'

export function guardAdmin(context: FunctionContext) {
  if (!context.isAdmin) {
    throw new RouteError(401, 'Unauthorized')
  }
}
