import { action, Action, thunk, Thunk } from 'easy-peasy'
import firebase from 'firebase/app'
import { StoreModel } from '.'
import { auth } from '../../api/firebase'

const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export interface AuthModel {
  user: firebase.User | undefined
  loading: boolean
  error: Error | undefined
  signout: Action<AuthModel>
  setLoading: Action<AuthModel, boolean>
  setError: Action<AuthModel, Error>
  setUser: Action<AuthModel, firebase.User>
  signinGoogle: Thunk<AuthModel, undefined, any, StoreModel>
}

const model: AuthModel = {
  user: undefined,
  loading: true,
  error: undefined,

  // Actions
  signout: action((state) => {
    state.user = undefined
    state.loading = false
    state.error = undefined
  }),
  setLoading: action((state, loading) => {
    state.loading = loading
  }),
  setError: action((state, error) => {
    state.error = error
    state.loading = false
  }),
  setUser: action((state, user) => {
    state.user = user
    state.error = undefined
    state.loading = false
  }),

  // Thunks
  signinGoogle: thunk(async (actions) => {
    actions.signout()
    actions.setLoading(true)
    try {
      await auth.signInWithPopup(googleAuthProvider)
    } catch (error) {
      actions.setError(error)
    }
  }),
}

export default model
