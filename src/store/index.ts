import { CircleEntry } from '@shared/model/circle'
import { MemberEntry } from '@shared/model/member'
import { RoleEntry } from '@shared/model/role'
import { createStore } from 'easy-peasy'
import { createModel } from './generic'
import orgs from './orgs'

const model = {
  circles: createModel<CircleEntry>(),
  members: createModel<MemberEntry>(),
  orgs,
  roles: createModel<RoleEntry>(),
}

export type StoreModel = typeof model

export const store = createStore(model)
