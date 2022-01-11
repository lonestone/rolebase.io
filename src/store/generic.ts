import { SubscriptionFn } from '@api/firebase'
import { action, Action, computed, Computed, thunk, Thunk } from 'easy-peasy'
import { StoreModel } from '.'

export interface GenericModel<Entry, SubscribeParam> {
  entries: Entry[] | undefined
  loading: boolean
  error: Error | undefined
  unsubscribeFistore?: () => void
  setLoading: Action<GenericModel<Entry, SubscribeParam>, boolean>
  setError: Action<GenericModel<Entry, SubscribeParam>, Error>
  setUnsubscribe: Action<GenericModel<Entry, SubscribeParam>, () => void>
  setEntries: Action<GenericModel<Entry, SubscribeParam>, Entry[]>
  subscribe: Thunk<
    GenericModel<Entry, SubscribeParam>,
    SubscribeParam,
    any,
    StoreModel
  >
  unsubscribe: Action<GenericModel<Entry, SubscribeParam>>
  getById: Computed<
    GenericModel<Entry, SubscribeParam>,
    (id: string) => Entry | undefined,
    StoreModel
  >
}

export interface GenericEntry {
  id: string
}

export type GenericSubscribe<Entry, SubscribeParam> = (
  param: SubscribeParam
) => SubscriptionFn<Entry[]>

export function createModel<Entry extends GenericEntry, SubscribeParam>(
  subscribe: GenericSubscribe<Entry, SubscribeParam>
): GenericModel<Entry, SubscribeParam> {
  return {
    entries: undefined,
    loading: false,
    error: undefined,
    unsubscribeFistore: undefined,

    // Actions
    setLoading: action((state, loading) => {
      state.loading = loading
    }),
    setError: action((state, error) => {
      state.error = error
      state.loading = false
    }),
    setEntries: action((state, entries) => {
      state.entries = entries
      state.error = undefined
      state.loading = false
    }),
    setUnsubscribe: action((state, unsubscribe) => {
      state.unsubscribeFistore = unsubscribe
    }),

    subscribe: thunk(async (actions, param) => {
      actions.unsubscribe()
      actions.setLoading(true)
      const unsubscribe = subscribe(param)(actions.setEntries, actions.setError)
      actions.setUnsubscribe(unsubscribe)
    }),

    unsubscribe: action((state) => {
      state.entries = undefined
      state.loading = false
      state.error = undefined
      state.unsubscribeFistore?.()
      state.unsubscribeFistore = undefined
    }),

    // Computed
    getById: computed((state) => {
      return (id) => state.entries?.find((entry) => entry.id === id)
    }),
  }
}
