import { WithId } from '@shared/model/types'
import { DocumentReference, getDoc } from 'firebase/firestore'

// Get document once
export async function getDocData<Entity>(
  doc: DocumentReference<Entity>
): Promise<WithId<Entity> | undefined> {
  const snapshot = await getDoc(doc)
  const data = snapshot.data()
  if (!data) return undefined
  return { id: doc.id, ...data }
}
