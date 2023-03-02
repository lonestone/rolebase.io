import { FunctionContext } from '../utils/getContext'
import { RouteError } from '../utils/route'

export function adminGuard(context: FunctionContext) {
  if (!context.isAdmin) {
    throw new RouteError(401, 'Unauthorized')
  }
}
