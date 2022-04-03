import { WithId } from '@shared/types'
import { documentId, Query, QueryConstraint, where } from 'firebase/firestore'
import { stackSubscribe, subscribeQuery, SubscriptionFn } from '../firebase'

export function subscribeIdsChunks<Entity>(
  ids: string[],
  getQuery: (constraint: QueryConstraint) => Query<Entity>
): SubscriptionFn<WithId<Entity>[]> {
  return stackSubscribe((onData, onError) => {
    if (ids.length === 0) {
      onData([])
      return () => {}
    }

    const unsubscribeHandlers: Function[] = []
    const chunksData: WithId<Entity>[][] = []
    const nChunks = Math.ceil(ids.length / 10)

    // Subscribe by chunks of 10 ids
    for (let i = 0; i < ids.length; i += 10) {
      const subscribe = subscribeQuery(
        getQuery(where(documentId(), 'in', ids.slice(i, i + 10)))
      )

      const unsubscribe = subscribe((data) => {
        chunksData[i] = data
        // Update data if all chunks are received
        if (chunksData.filter(Boolean).length === nChunks) {
          onData(chunksData.flat())
        }
      }, onError)

      unsubscribeHandlers.push(unsubscribe)
    }
    return () => {
      unsubscribeHandlers.forEach((unsubscribe) => unsubscribe())
      unsubscribeHandlers.length = 0
    }
  })
}
