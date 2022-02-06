import { Log } from '@shared/log'
import { Optional } from '@shared/types'
import { orderBy, query, Timestamp, where } from 'firebase/firestore'
import { memoize } from 'src/memoize'
import { getCollection, getEntityMethods, subscribeQuery } from '../firebase'

export const collection = getCollection<Log>('logs')

const methods = getEntityMethods(collection, {
  createTransform: (log: Optional<Log, 'createdAt'>) => ({
    ...log,
    createdAt: Timestamp.now(),
  }),
})
export const createLog = methods.create

export const subscribeAllLogs = memoize((orgId: string) =>
  subscribeQuery(
    query(collection, where('orgId', '==', orgId), orderBy('createdAt', 'desc'))
  )
)

export const subscribeLogsByMeeting = memoize(
  (orgId: string, meetingId: string) =>
    subscribeQuery(
      query(
        collection,
        where('orgId', '==', orgId),
        where('meetingId', '==', meetingId),
        orderBy('createdAt', 'desc')
      )
    )
)
