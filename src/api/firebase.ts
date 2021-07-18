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

export function snapshotQuery<Entity>(
  query: firebase.default.firestore.Query<Entity>,
  onData: (circles: (Entity & { id: string })[]) => void,
  onError: (error: Error) => void
): () => void {
  const entries: (Entity & { id: string })[] = []
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
