import { WithId } from '@shared/model/types'
import { onSnapshot, Query } from 'firebase/firestore'
import { SubscriptionFn } from './subscribe'

// Subscribe to query's results
export function subscribeQueryChanges<Entity>(
  query: Query<Entity>
): SubscriptionFn<WithId<Entity>[]> {
  return (onData, onError) => {
    const entries: WithId<Entity>[] = []
    return onSnapshot(
      query,
      (querySnapshot) => {
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
        onData([...entries]) // Spread to avoid side effects
      },
      onError
    )
  }
}
