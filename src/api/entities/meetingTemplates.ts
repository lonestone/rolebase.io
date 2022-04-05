import { getCollection } from '@api/helpers/getCollection'
import { getEntityMethods } from '@api/helpers/getEntityMethods'
import { subscribeQuery } from '@api/helpers/subscribeQuery'
import { MeetingTemplate } from '@shared/meetingTemplate'
import { orderBy, query, where } from 'firebase/firestore'
import { memoize } from 'src/memoize'

export const collection = getCollection<MeetingTemplate>('meetingTemplates')

const methods = getEntityMethods(collection)
export const getMeetingTemplate = methods.get
export const createMeetingTemplate = methods.create
export const updateMeetingTemplate = methods.update
export const subscribeMeetingTemplate = methods.subscribe
export const deleteMeetingTemplate = methods.delete

export const subscribeAllMeetingTemplates = memoize((orgId: string) =>
  subscribeQuery(
    query(collection, where('orgId', '==', orgId), orderBy('title', 'asc'))
  )
)
