import { action, Action, computed, Computed } from 'easy-peasy'
import { StoreModel } from '.'

export interface GenericModel<Entry> {
  entries: Entry[] | undefined
  loading: boolean
  error: Error | undefined
  setSubscriptionResult: Action<
    GenericModel<Entry>,
    {
      entries: Entry[] | undefined
      loading: boolean
      error: Error | undefined
    }
  >
  getById: Computed<
    GenericModel<Entry>,
    (id: string) => Entry | undefined,
    StoreModel
  >
}

export interface GenericEntry {
  id: string
}

export function createModel<Entry extends GenericEntry>(): GenericModel<Entry> {
  return {
    entries: undefined,
    loading: false,
    error: undefined,

    // Actions
    setSubscriptionResult: action((state, { entries, loading, error }) => {
      state.entries = entries
      state.loading = loading
      state.error = error
    }),

    // Computed
    getById: computed((state) => {
      return (id) => state.entries?.find((entry) => entry.id === id)
    }),
  }
}
