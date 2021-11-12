import { SubscriptionFn } from '@api/firebase'
import { action, Action, computed, Computed, thunk, Thunk } from 'easy-peasy'
import { StoreModel } from '.'

export interface GenericModel<Entry> {
  entries: Entry[] | undefined
  loading: boolean
  error: Error | undefined
  unsubscribeFistore?: () => void
  reset: Action<GenericModel<Entry>>
  setLoading: Action<GenericModel<Entry>, boolean>
  setError: Action<GenericModel<Entry>, Error>
  setUnsubscribe: Action<GenericModel<Entry>, () => void>
  setEntries: Action<GenericModel<Entry>, Entry[]>
  unsubscribe: Action<GenericModel<Entry>>
  subscribe: Thunk<GenericModel<Entry>, { parentId: string }, any, StoreModel>
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
    reset: action((state) => {
      state.entries = undefined
      state.loading = false
      state.error = undefined
      state.unsubscribeFistore?.()
      state.unsubscribeFistore = undefined
    }),
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
    unsubscribe: action((state) => {
      state.unsubscribeFistore?.()
      state.unsubscribeFistore = undefined
    }),

    // Thunks
    subscribe: thunk(async (actions, { parentId }) => {
      actions.reset()
      actions.setLoading(true)
      const unsubscribe = subscribe(parentId)(
        actions.setEntries,
        actions.setError
      )
      actions.setUnsubscribe(unsubscribe)
    }),

    // Computed
    getById: computed((state) => {
      return (id) => state.entries?.find((entry) => entry.id === id)
    }),
  }
}
