import { CircleFullFragment, MemberFragment, RoleFragment } from '@gql'
import { createStore } from 'easy-peasy'
import { createModel } from './generic'
import orgs from './orgs'

const model = {
  circles: createModel<CircleFullFragment>(),
  members: createModel<MemberFragment>(),
  orgs,
  roles: createModel<RoleFragment>(),
}

export type StoreModel = typeof model

export const store = createStore(model)
