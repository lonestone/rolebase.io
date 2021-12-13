import { Activity, ActivityEntry, ActivityType } from '@shared/activity'
import { Optional } from '@shared/types'
import { memoize } from 'src/memoize'
import * as yup from 'yup'
import {
  getCollection,
  getEntityMethods,
  subscribeQuery,
  Timestamp,
} from '../firebase'
import { updateThread } from './threads'

export const collection = getCollection<Activity>('activities')

const methods = getEntityMethods(collection, {
  createTransform: (activity: Optional<Activity, 'createdAt'>) =>
    ({
      ...activity,
      createdAt: Timestamp.now(),
    } as Activity),
})
export const getActivity = methods.get
export const updateActivity = methods.update
export const subscribeActivity = methods.subscribe
export const deleteActivity = methods.delete

export const subscribeActivities = memoize((orgId: string, threadId: string) =>
  subscribeQuery(
    collection
      .where('orgId', '==', orgId)
      .where('threadId', '==', threadId)
      .orderBy('createdAt')
  )
)

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

  // Create activity
  const { id } = await methods.create(activity)

  // Update thread
  updateThread(activity.threadId, {
    lastActivityId: id,
    lastActivityDate: Timestamp.now(),
  })
}

export const activityMessageSchema = yup.object().shape({
  message: yup.string().required(),
})

export const activityDecisionSchema = yup.object().shape({
  circleId: yup.string().required(),
  decision: yup.string().required(),
  explanation: yup.string(),
})

export const activityPollSchema = yup.object().shape({
  question: yup.string().required(),
  choices: yup.array().of(
    yup.object().shape({
      title: yup.string().required(),
    })
  ),
})
