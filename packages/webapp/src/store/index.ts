import memberStatus from '@/member/store/memberStatus'
import org from '@/org/store/org'
import orgs from '@/org/store/orgs'
import { createStore } from 'easy-peasy'

const model = {
  orgs,
  org,
  memberStatus,
}

export type StoreModel = typeof model

export const store = createStore(model)
