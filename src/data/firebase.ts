import firebase from 'firebase/app'
import 'firebase/firestore'
import settings from '../settings'

export const firebaseApp = firebase.initializeApp(settings.firebase)
export const firestore = firebaseApp.firestore()

export type FirebaseHookReturn<Data> = [
  data: Data | undefined,
  loading: boolean,
  error: Error | undefined
]
