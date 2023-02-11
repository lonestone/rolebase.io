import { OrgFragment } from '@gql'
import { createStore } from 'easy-peasy'
import { createModel } from './generic'
import org from './org'

const model = {
  orgs: createModel<OrgFragment>(),
  org,
}

export type StoreModel = typeof model

export const store = createStore(model)
