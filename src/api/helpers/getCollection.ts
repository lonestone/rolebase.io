import { collection, CollectionReference } from 'firebase/firestore'
import { firestore } from '../firebase'

export function getCollection<Entity>(collectionPath: string) {
  return collection(firestore, collectionPath) as CollectionReference<Entity>
}
