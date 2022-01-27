import { Thread } from '@shared/thread'
import { Optional } from '@shared/types'
import { query, Timestamp, where } from 'firebase/firestore'
import { memoize } from 'src/memoize'
import { getCollection, getEntityMethods, subscribeQuery } from '../firebase'

export const collection = getCollection<Thread>('threads')

const methods = getEntityMethods(collection, {
  createTransform: (thread: Optional<Thread, 'createdAt' | 'archived'>) => ({
    ...thread,
    archived: false,
    createdAt: Timestamp.now(),
  }),
})
export const getThread = methods.get
export const createThread = methods.create
export const updateThread = methods.update
export const subscribeThread = methods.subscribe
export const deleteThread = methods.delete

export const subscribeAllThreads = memoize((orgId: string, archived: boolean) =>
  subscribeQuery(
    query(
      collection,
      where('orgId', '==', orgId),
      where('archived', '==', archived)
    )
  )
)

export const subscribeThreadsByCircle = memoize(
  (orgId: string, circleId: string, archived: boolean) =>
    subscribeQuery(
      query(
        collection,
        where('orgId', '==', orgId),
        where('circleId', '==', circleId),
        where('archived', '==', archived)
      )
    )
)
