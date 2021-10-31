import { RoleEntry } from '@shared/roles'
import { subscribeRoles } from '../../api/entities/roles'
import { createModel } from './generic'

export default createModel<RoleEntry>(subscribeRoles)
