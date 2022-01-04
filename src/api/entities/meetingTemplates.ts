import { MeetingTemplate } from '@shared/meetingTemplate'
import { memoize } from 'src/memoize'
import { getCollection, getEntityMethods, subscribeQuery } from '../firebase'

export const collection = getCollection<MeetingTemplate>('meetingTemplates')

const methods = getEntityMethods(collection)
export const getMeetingTemplate = methods.get
export const createMeetingTemplate = methods.create
export const updateMeetingTemplate = methods.update
export const subscribeMeetingTemplate = methods.subscribe
export const deleteMeetingTemplate = methods.delete

export const subscribeAllMeetingTemplates = memoize((orgId: string) =>
  subscribeQuery(collection.where('orgId', '==', orgId).orderBy('title', 'asc'))
)