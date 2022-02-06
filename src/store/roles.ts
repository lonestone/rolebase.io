import { subscribeRoles } from '@api/entities/roles'
import { createModel } from './generic'

export default createModel((orgId: string) => subscribeRoles(orgId, false))
