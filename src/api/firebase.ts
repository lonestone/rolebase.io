import firebaseApp from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import settings from '../settings'

const app = firebaseApp.initializeApp(settings.firebase)

export const auth = app.auth()
export const firestore = app.firestore()
export const storage = app.storage()

export type FirebaseHookReturn<Data> = [
  data: Data | undefined,
  loading: boolean,
  error: Error | undefined
]

export function getCollection<DocumentData>(collectionPath: string) {
  return firestore.collection(
    collectionPath
  ) as firebase.default.firestore.CollectionReference<DocumentData>
}
