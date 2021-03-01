import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import settings from '../settings'

export const firebaseApp = firebase.initializeApp(settings.firebase)
export const firestore = firebaseApp.firestore()
export const storage = firebaseApp.storage()

export type FirebaseHookReturn<Data> = [
  data: Data | undefined,
  loading: boolean,
  error: Error | undefined
]
