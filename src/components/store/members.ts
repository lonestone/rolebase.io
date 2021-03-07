import { MemberEntry, subscribeMembers } from '../../api/entities/members'
import { createModel } from './generic'

export default createModel<MemberEntry>(subscribeMembers)
