import { WithId } from '@shared/model/types'
import { Query } from 'firebase/firestore'
import { stackSubscribe } from './stackSubscribe'
import { SubscriptionFn } from './subscribe'
import { subscribeQueryChanges } from './subscribeQueryChanges'

// Subscribe to query's results
export function subscribeQuery<Entity>(
  query: Query<Entity>
): SubscriptionFn<WithId<Entity>[]> {
  return stackSubscribe((onData, onError) =>
    subscribeQueryChanges(query)(onData, onError)
  )
}
