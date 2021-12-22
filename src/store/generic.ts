import { SubscriptionFn } from '@api/firebase'
import { action, Action, computed, Computed, thunk, Thunk } from 'easy-peasy'
import { StoreModel } from '.'

export interface GenericModel<Entry> {
  entries: Entry[] | undefined
  loading: boolean
  error: Error | undefined
  unsubscribeFistore?: () => void
  setLoading: Action<GenericModel<Entry>, boolean>
  setError: Action<GenericModel<Entry>, Error>
  setUnsubscribe: Action<GenericModel<Entry>, () => void>
  setEntries: Action<GenericModel<Entry>, Entry[]>
  subscribe: Thunk<GenericModel<Entry>, { parentId: string }, any, StoreModel>
  unsubscribe: Action<GenericModel<Entry>>
  getById: Computed<
    GenericModel<Entry>,
    (id: string) => Entry | undefined,
    StoreModel
  >
}

export interface GenericEntry {
  id: string
}

export type GenericSubscribe<Entry> = (
  paramId: string
) => SubscriptionFn<Entry[]>

export function createModel<Entry extends GenericEntry>(
  subscribe: GenericSubscribe<Entry>
): GenericModel<Entry> {
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

    subscribe: thunk(async (actions, { parentId }) => {
      actions.unsubscribe()
      actions.setLoading(true)
      const unsubscribe = subscribe(parentId)(
        actions.setEntries,
        actions.setError
      )
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
