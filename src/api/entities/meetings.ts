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

export const subscribeMeetingsByDates = memoize(
  (orgId: string, fromDate: Date, toDate: Date) =>
    subscribeQuery(
      collection
        .where('orgId', '==', orgId)
        .where('startDate', '>=', fromDate)
        .where('startDate', '<', Timestamp.fromDate(toDate))
    )
)

export const subscribeMeetingsByCircle = memoize(
  (orgId: string, circleId: string, ended: boolean) =>
    subscribeQuery(
      collection
        .where('orgId', '==', orgId)
        .where('circleId', '==', circleId)
        .where('ended', '==', ended)
        .orderBy('startDate', 'desc')
    )
)

export function updateMeetingDates(id: string, startDate: Date, endDate: Date) {
  updateMeeting(id, {
    startDate: Timestamp.fromDate(startDate),
    endDate: Timestamp.fromDate(endDate),
  })
}
