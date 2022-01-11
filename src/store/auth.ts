import { createUser, subscribeUser } from '@api/entities/users'
import { auth } from '@api/firebase'
import { UserEntry } from '@shared/user'
import { UserClaims } from '@shared/userClaims'
import { action, Action, thunk, Thunk } from 'easy-peasy'
import firebase from 'firebase/app'
import { store, StoreModel } from '.'

const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export interface AuthModel {
  user: UserEntry | undefined
  claims: UserClaims | undefined
  loading: boolean
  error: Error | undefined
  signout: Action<AuthModel>
  setLoading: Action<AuthModel, boolean>
  setError: Action<AuthModel, Error>
  setUser: Action<AuthModel, UserEntry>
  setClaims: Action<AuthModel, UserClaims>
  signinGoogle: Thunk<AuthModel, undefined, any, StoreModel>
  signinEmail: Thunk<
    AuthModel,
    { email: string; password: string },
    any,
    StoreModel
  >
  signup: Thunk<
    AuthModel,
    { name: string; email: string; password: string },
    any,
    StoreModel
  >
}

// Observe auth state
let unsubscribeUser: (() => void) | undefined
auth.onAuthStateChanged((firebaseUser) => {
  const { setUser, setError, setClaims, signout } = store.getActions().auth

  unsubscribeUser?.()
  unsubscribeUser = undefined
  if (firebaseUser && firebaseUser.email) {
    // Subscribe user entry
    let refreshTokenTime: number | undefined = undefined
    unsubscribeUser = subscribeUser(firebaseUser.uid)(async (user) => {
      // Set user in store
      setUser(user)

      // Observe change in refreshTokenTime
      if (!refreshTokenTime || refreshTokenTime !== user.refreshTokenTime) {
        refreshTokenTime = user.refreshTokenTime
        // Get claims
        const idTokenResult = await firebaseUser.getIdTokenResult(true)
        setClaims(idTokenResult.claims)
      }
    }, setError)
  } else {
    // Signout
    signout()
  }
})

const model: AuthModel = {
  user: undefined,
  claims: undefined,
  loading: true,
  error: undefined,

  // Actions
  signout: action((state) => {
    state.user = undefined
    state.claims = undefined
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
  setClaims: action((state, claims) => {
    state.claims = claims
  }),

  // Thunks
  signinGoogle: thunk(async (actions) => {
    actions.signout()
    actions.setLoading(true)
    try {
      // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithpopup
      await auth.signInWithPopup(googleAuthProvider)
    } catch (error: any) {
      actions.setError(error)
    }
  }),

  signinEmail: thunk(async (actions, { email, password }) => {
    actions.signout()
    actions.setLoading(true)
    try {
      // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithemailandpassword
      await auth.signInWithEmailAndPassword(email, password)
    } catch (error: any) {
      actions.setError(error)
    }
  }),

  signup: thunk(async (actions, { name, email, password }) => {
    actions.signout()
    actions.setLoading(true)
    try {
      // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithemailandpassword
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      )
      if (!userCredential.user) {
        throw new Error('No Firebase User from createUserWithEmailAndPassword')
      }

      await createUser(userCredential.user.uid, { email, name })
    } catch (error: any) {
      actions.setError(error)
    }
  }),
}

export default model
