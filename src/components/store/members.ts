import { MemberEntry } from '@shared/members'
import { subscribeMembers } from '../../api/entities/members'
import { createModel } from './generic'

export default createModel<MemberEntry>(subscribeMembers)
