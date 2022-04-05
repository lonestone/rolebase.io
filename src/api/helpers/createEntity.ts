import { WithId } from '@shared/types'
import {
  addDoc,
  CollectionReference,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore'

export async function createEntity<Entity>(
  collection: CollectionReference<Entity>,
  entity: Entity,
  id?: string
): Promise<WithId<Entity>> {
  delete (entity as any).id // Remove id if it exists
  const newDoc = await (id ? doc(collection, id) : addDoc(collection, entity))
  if (id) {
    setDoc(newDoc, entity)
  }
  const snapshot = await getDoc(newDoc)
  return { ...snapshot.data()!, id: newDoc.id }
}
