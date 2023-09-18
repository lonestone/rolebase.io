import { createStore } from 'easy-peasy'
import org from './org'
import orgs from './orgs'

const model = {
  orgs,
  org,
}

export type StoreModel = typeof model

export const store = createStore(model)
