import { WithId } from '@shared/types'
import firebaseApp from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/storage'
import settings from '../settings'

const app = firebaseApp.initializeApp(settings.firebase)

export const auth = app.auth()
export const firestore = app.firestore()
export const storage = app.storage()
export const functions = app.functions()

if (location.hostname === 'localhost') {
  auth.useEmulator('http://localhost:9099')
  firestore.useEmulator('localhost', 8080)
  functions.useEmulator('localhost', 5001)
}

export function getCollection<DocumentData>(collectionPath: string) {
  return firestore.collection(
    collectionPath
  ) as firebase.default.firestore.CollectionReference<DocumentData>
}

export type SubscriptionFn<Data> = (
  onData: (data: Data) => void,
  onError: (error: Error) => void
) => () => void

// Subscribe to query's results
export function subscribeQuery<Entity>(
  query: firebase.default.firestore.Query<Entity>
): SubscriptionFn<WithId<Entity>[]> {
  return (onData, onError) => {
    const entries: WithId<Entity>[] = []
    return query.onSnapshot((querySnapshot) => {
      querySnapshot.docChanges().forEach((changes) => {
        if (changes.type === 'modified' || changes.type === 'removed') {
          entries.splice(changes.oldIndex, 1)
        }
        if (changes.type === 'added' || changes.type === 'modified') {
          entries.splice(changes.newIndex, 0, {
            id: changes.doc.id,
            ...changes.doc.data(),
          })
        }
      })
      onData([...entries])
    }, onError)
  }
}

// Get results from query once
export async function executeQuery<Entity>(
  query: firebase.default.firestore.Query<Entity>
): Promise<WithId<Entity>[]> {
  const querySnapshot = await query.get()
  return querySnapshot.docs.map((snapshot) => ({
    id: snapshot.id,
    ...snapshot.data(),
  }))
}

// Subscribe to document changes
export function subscribeDoc<Entity>(
  doc: firebase.default.firestore.DocumentReference<Entity>
): SubscriptionFn<WithId<Entity>> {
  return (onData, onError) => {
    return doc.onSnapshot((doc) => {
      const data = doc.data()
      if (data) {
        onData({ id: doc.id, ...data })
      } else {
        onError(new Error('Document not found'))
      }
    }, onError)
  }
}
