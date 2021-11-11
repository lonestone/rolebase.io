import { Activity } from '@shared/activity'
import * as yup from 'yup'
import { getCollection, getEntityMethods, subscribeQuery } from '../firebase'

const collection = getCollection<Activity>('activitiess')

const methods = getEntityMethods<Activity, 'createdAt'>(collection, {
  createTransform: (activity) =>
    ({
      ...activity,
      createdAt: new Date(),
    } as Activity),
})
export const getActivity = methods.get
export const createActivity = methods.create
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

export const activityMessageSchema = yup.object().shape({
  message: yup.string().required(),
})
