import { FunctionContext } from './getContext'
import { RouteError } from './route'

export function authGuard(context: FunctionContext) {
  if (!context.isAuthenticated) {
    throw new RouteError(401, 'Unauthorized')
  }
}
