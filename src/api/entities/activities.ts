import { Activity, ActivityEntry, ActivityType } from '@shared/activity'
import { Optional } from '@shared/types'
import * as yup from 'yup'
import { getCollection, getEntityMethods, subscribeQuery } from '../firebase'

const collection = getCollection<Activity>('activities')

const methods = getEntityMethods<Activity, 'createdAt'>(collection, {
  createTransform: (activity) =>
    ({
      ...activity,
      createdAt: new Date(),
    } as Activity),
})
export const getActivity = methods.get
export const updateActivity = methods.update
export const subscribeActivity = methods.subscribe
export const deleteActivity = methods.delete

export function subscribeActivities(orgId: string, threadId: string) {
  return subscribeQuery(
    collection
      .where('orgId', '==', orgId)
      .where('threadId', '==', threadId)
      .orderBy('createdAt')
  )
}

export async function getLastActivity(
  orgId: string,
  threadId: string
): Promise<ActivityEntry | undefined> {
  const snapshot = await collection
    .where('orgId', '==', orgId)
    .where('threadId', '==', threadId)
    .orderBy('createdAt', 'desc')
    .limit(1)
    .get()
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
      last.userId === activity.userId
    ) {
      return updateActivity(last.id, {
        message: last.message + '\n' + activity.message,
      })
    }
  }
  await methods.create(activity)
}

export const activityMessageSchema = yup.object().shape({
  message: yup.string().required(),
})
