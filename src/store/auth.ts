import { createUser, subscribeUser } from '@api/entities/users'
import { auth } from '@api/firebase'
import { UserEntry } from '@shared/model/user'
import { UserClaims } from '@shared/model/userClaims'
import { action, Action, State, thunk, Thunk } from 'easy-peasy'
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
} from 'firebase/auth'
import { store, StoreModel } from '.'

const googleAuthProvider = new GoogleAuthProvider()

export interface AuthModel {
  firebaseUser: User | undefined
  user: UserEntry | undefined
  claims: UserClaims | undefined
  loading: boolean
  error: Error | undefined
  refreshClaims: Thunk<AuthModel>
  signout: Action<AuthModel>
  setLoading: Action<AuthModel, boolean>
  setError: Action<AuthModel, Error>
  setUser: Action<AuthModel, { firebaseUser: User; user: UserEntry }>
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
onAuthStateChanged(auth, (firebaseUser) => {
  const { setUser, setError, refreshClaims, signout } = store.getActions().auth

  unsubscribeUser?.()
  unsubscribeUser = undefined
  if (firebaseUser) {
    // Subscribe user entry
    let refreshTokenTime: number | undefined = undefined
    unsubscribeUser = subscribeUser(firebaseUser.uid)((user) => {
      // Set user in store
      setUser({ firebaseUser, user })

      // Observe change in refreshTokenTime
      if (!refreshTokenTime || refreshTokenTime !== user.refreshTokenTime) {
        refreshTokenTime = user.refreshTokenTime
        // Get claims
        refreshClaims()
      }
    }, setError)
  } else {
    // Signout
    signout()
  }
})

const model: AuthModel = {
  firebaseUser: undefined,
  user: undefined,
  claims: undefined,
  loading: true,
  error: undefined,

  // Actions
  signout: action((state) => {
    state.firebaseUser = undefined
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
  setUser: action((state, { firebaseUser, user }) => {
    state.firebaseUser = firebaseUser
    state.user = user
    state.error = undefined
    state.loading = false
  }),
  setClaims: action((state, claims) => {
    state.claims = claims
  }),

  // Thunks
  refreshClaims: thunk(async (actions, _, { getState }) => {
    const { firebaseUser } = getState() as State<AuthModel>
    if (!firebaseUser) return
    const idTokenResult = await firebaseUser.getIdTokenResult(true)
    actions.setClaims(idTokenResult.claims as UserClaims)
  }),

  signinGoogle: thunk(async (actions) => {
    actions.signout()
    actions.setLoading(true)
    try {
      // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithpopup
      await signInWithPopup(auth, googleAuthProvider)
    } catch (error: any) {
      actions.setError(error)
    }
  }),

  signinEmail: thunk(async (actions, { email, password }) => {
    actions.signout()
    actions.setLoading(true)
    try {
      // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithemailandpassword
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error: any) {
      actions.setError(error)
    }
  }),

  signup: thunk(async (actions, { name, email, password }) => {
    actions.signout()
    actions.setLoading(true)
    try {
      // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithemailandpassword
      const userCredential = await createUserWithEmailAndPassword(
        auth,
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
