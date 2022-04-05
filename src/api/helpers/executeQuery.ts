import { WithId } from '@shared/types'
import { getDocs, Query } from 'firebase/firestore'

// Get results from query once
export async function executeQuery<Entity>(
  query: Query<Entity>
): Promise<WithId<Entity>[]> {
  const querySnapshot = await getDocs(query)
  return querySnapshot.docs.map((snapshot) => ({
    id: snapshot.id,
    ...snapshot.data(),
  }))
}
