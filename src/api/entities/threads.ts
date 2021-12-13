import { Thread } from '@shared/thread'
import { Optional } from '@shared/types'
import { memoize } from 'src/memoize'
import * as yup from 'yup'
import {
  getCollection,
  getEntityMethods,
  subscribeQuery,
  Timestamp,
} from '../firebase'
import { nameSchema } from '../schemas'

export const collection = getCollection<Thread>('threads')

const methods = getEntityMethods(collection, {
  createTransform: (thread: Optional<Thread, 'createdAt'>) => ({
    ...thread,
    createdAt: Timestamp.now(),
  }),
})
export const getThread = methods.get
export const createThread = methods.create
export const updateThread = methods.update
export const subscribeThread = methods.subscribe
export const deleteThread = methods.delete

export const subscribeThreads = memoize(
  (orgId: string, archived: boolean = false) =>
    subscribeQuery(
      collection
        .where('orgId', '==', orgId)
        .where('archived', '==', archived)
        .orderBy('createdAt')
    )
)

export const threadSchema = yup.object().shape({
  title: nameSchema,
  circleId: yup.string().required(),
  archived: yup.boolean(),
  draft: yup.boolean(),
})
