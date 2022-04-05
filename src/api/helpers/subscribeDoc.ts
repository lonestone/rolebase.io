import { WithId } from '@shared/types'
import { DocumentReference, onSnapshot } from 'firebase/firestore'
import { stackSubscribe } from './stackSubscribe'
import { SubscriptionFn } from './subscribe'

// Subscribe to document changes
export function subscribeDoc<Entity>(
  doc: DocumentReference<Entity>
): SubscriptionFn<WithId<Entity>> {
  return stackSubscribe((onData, onError) => {
    return onSnapshot(
      doc,
      (doc) => {
        const data = doc.data()
        if (data) {
          onData({ id: doc.id, ...data })
        } else {
          onError(new Error('Document not found'))
        }
      },
      onError
    )
  })
}
