import {
  getEntityMethods,
  getSubCollection,
  subscribeQuery,
} from '@api/firebase'
import { MemberThreadStatus } from '@shared/member'
import { Optional } from '@shared/types'
import { doc, Timestamp } from 'firebase/firestore'
import { memoize } from 'src/memoize'
import { collection as membersCollection } from './members'

export const memberThreadsStatus = memoize((memberId: string) => {
  const collection = getSubCollection<MemberThreadStatus>(
    doc(membersCollection, memberId),
    'threadStatus'
  )

  const methods = getEntityMethods(collection, {
    createTransform: (
      activity: Optional<MemberThreadStatus, 'lastReadDate'>
    ) => ({
      lastReadDate: Timestamp.now(),
      ...activity,
    }),
  })
  return {
    createThreadStatus: methods.create,
    deleteThreadStatus: methods.delete,
    subscribeThreadStatus: methods.subscribe,
    subscribeThreadStatuses: memoize(() => subscribeQuery(collection)),
  }
})
