import { subscribeMembers } from '@api/entities/members'
import { MemberEntry } from '@shared/member'
import { createModel } from './generic'

export default createModel<MemberEntry>(subscribeMembers)
