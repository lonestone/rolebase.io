import { subscribeMembers } from '@api/entities/members'
import { createModel } from './generic'

export default createModel((orgId: string) => subscribeMembers(orgId, false))
