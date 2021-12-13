import {
  getEntityMethods,
  getSubCollection,
  subscribeQuery,
  Timestamp,
} from '@api/firebase'
import { MemberThreadStatus } from '@shared/member'
import { Optional } from '@shared/types'
import { memoize } from 'src/memoize'
import { collection as membersCollection } from './members'

export const memberThreadsStatus = memoize((memberId: string) => {
  const collection = getSubCollection<MemberThreadStatus>(
    membersCollection.doc(memberId),
    'threadStatus'
  )

  const methods = getEntityMethods(collection, {
    createTransform: (
      activity: Optional<MemberThreadStatus, 'lastReadDate'>
    ) => ({
      ...activity,
      lastReadDate: Timestamp.now(),
    }),
  })
  return {
    createThreadStatus: methods.create,
    deleteThreadStatus: methods.delete,
    subscribeThreadStatus: methods.subscribe,
    subscribeThreadStatuses: memoize(() => subscribeQuery(collection)),
  }
})
