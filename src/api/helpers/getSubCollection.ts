import {
  collection,
  CollectionReference,
  DocumentReference,
} from 'firebase/firestore'

export function getSubCollection<Entity>(
  doc: DocumentReference<any>,
  collectionPath: string
) {
  return collection(doc, collectionPath) as CollectionReference<Entity>
}
