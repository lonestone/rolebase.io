import { Meeting } from '@shared/meeting'
import { Optional } from '@shared/types'
import { memoize } from 'src/memoize'
import {
  getCollection,
  getEntityMethods,
  subscribeQuery,
  Timestamp,
} from '../firebase'

export const collection = getCollection<Meeting>('meetings')

const methods = getEntityMethods(collection, {
  createTransform: (meeting: Optional<Meeting, 'createdAt'>) => ({
    ...meeting,
    createdAt: Timestamp.now(),
  }),
})
export const getMeeting = methods.get
export const createMeeting = methods.create
export const updateMeeting = methods.update
export const subscribeMeeting = methods.subscribe
export const deleteMeeting = methods.delete

export const subscribeAllMeetings = memoize(
  (orgId: string, ended: boolean = false) =>
    subscribeQuery(
      collection
        .where('orgId', '==', orgId)
        .where('ended', '==', ended)
        .orderBy('endDate', 'desc')
    )
)

export const subscribeCircleMeetings = memoize((circleId: string) =>
  subscribeQuery(
    collection.where('circleId', '==', circleId).orderBy('endDate', 'desc')
  )
)
