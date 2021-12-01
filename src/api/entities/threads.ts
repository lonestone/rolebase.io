import { Thread } from '@shared/thread'
import { Optional } from '@shared/types'
import memoize from 'memoizee'
import * as yup from 'yup'
import {
  getCollection,
  getEntityMethods,
  subscribeQuery,
  Timestamp,
} from '../firebase'
import { nameSchema } from '../schemas'

const collection = getCollection<Thread>('threads')

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

export const subscribeThreads = memoize((orgId: string) =>
  subscribeQuery(collection.where('orgId', '==', orgId).orderBy('createdAt'))
)

export const threadSchema = yup.object().shape({
  title: nameSchema,
  circleId: yup.string().required(),
  archived: yup.boolean(),
  draft: yup.boolean(),
})
