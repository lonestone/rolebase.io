import { Activity, ActivityEntry, ActivityType } from '@shared/activity'
import { Optional } from '@shared/types'
import { isSameDay } from 'date-fns'
import {
  getDocs,
  limit,
  orderBy,
  query,
  Timestamp,
  where,
} from 'firebase/firestore'
import { memoize } from 'src/memoize'
import { getCollection, getEntityMethods, subscribeQuery } from '../firebase'
import { updateThread } from './threads'

export const collection = getCollection<Activity>('activities')

const methods = getEntityMethods(collection, {
  createTransform: (activity: Optional<Activity, 'createdAt'>) =>
    ({
      createdAt: Timestamp.now(),
      ...activity,
    } as Activity),
})
export const getActivity = methods.get
export const updateActivity = methods.update
export const subscribeActivity = methods.subscribe
export const deleteActivity = methods.delete

export const subscribeActivities = memoize((orgId: string, threadId: string) =>
  subscribeQuery(
    query(
      collection,
      where('orgId', '==', orgId),
      where('threadId', '==', threadId),
      orderBy('createdAt')
    )
  )
)

export async function getLastActivity(
  orgId: string,
  threadId: string
): Promise<ActivityEntry | undefined> {
  const snapshot = await getDocs(
    query(
      collection,
      where('orgId', '==', orgId),
      where('threadId', '==', threadId),
      orderBy('createdAt', 'desc'),
      limit(1)
    )
  )
  if (snapshot.empty) return undefined
  const doc = snapshot.docs[0]
  return { id: doc.id, ...doc.data() }
}

export async function createActivity(
  activity: Optional<Activity, 'createdAt'>
): Promise<void> {
  // Append message to existing message if possible
  if (activity.type === ActivityType.Message) {
    const last = await getLastActivity(activity.orgId, activity.threadId)
    if (
      last &&
      last.type === ActivityType.Message &&
      // Same user
      last.userId === activity.userId &&
      // Same day
      isSameDay(last.createdAt.toDate(), new Date())
    ) {
      return updateActivity(last.id, {
        message: last.message + '\n\n' + activity.message,
      })
    }
  }

  // Create activity
  const { id } = await methods.create(activity)

  // Update thread
  updateThread(activity.threadId, {
    lastActivityId: id,
    lastActivityDate: Timestamp.now(),
  })
}
