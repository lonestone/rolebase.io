import { subscribeRoles } from '@api/entities/roles'
import { RoleEntry } from '@shared/role'
import { createModel } from './generic'

export default createModel<RoleEntry>(subscribeRoles)
