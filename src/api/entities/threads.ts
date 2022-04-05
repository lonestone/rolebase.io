import { getCollection } from '@api/helpers/getCollection'
import { getEntityMethods } from '@api/helpers/getEntityMethods'
import { subscribeQuery } from '@api/helpers/subscribeQuery'
import { MembersScope } from '@shared/member'
import { Thread } from '@shared/thread'
import { Optional } from '@shared/types'
import { query, Timestamp, where } from 'firebase/firestore'
import { memoize } from 'src/memoize'

export const collection = getCollection<Thread>('threads')

const methods = getEntityMethods(collection, {
  createTransform: (
    thread: Optional<
      Thread,
      'createdAt' | 'archived' | 'participantsScope' | 'participantsMembersIds'
    >
  ) => ({
    ...thread,
    archived: false,
    createdAt: Timestamp.now(),
    participantsScope: MembersScope.CircleLeaders,
    participantsMembersIds: [],
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
