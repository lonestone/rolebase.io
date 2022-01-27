import { Task } from '@shared/task'
import { Optional } from '@shared/types'
import { query, Timestamp, where } from 'firebase/firestore'
import { memoize } from 'src/memoize'
import { getCollection, getEntityMethods, subscribeQuery } from '../firebase'

export const collection = getCollection<Task>('tasks')

const methods = getEntityMethods(collection, {
  createTransform: (
    task: Optional<Task, 'createdAt' | 'doneDate' | 'archived'>
  ) => ({
    createdAt: Timestamp.now(),
    doneDate: null,
    archived: false,
    ...task,
  }),
})
export const getTask = methods.get
export const createTask = methods.create
export const updateTask = methods.update
export const subscribeTask = methods.subscribe
export const deleteTask = methods.delete

export const subscribeTasksByMember = memoize(
  (orgId: string, memberId: string, done: boolean) =>
    subscribeQuery(
      query(
        collection,
        where('orgId', '==', orgId),
        where('memberId', '==', memberId),
        where('doneDate', done ? '!=' : '==', null),
        where('archived', '==', false)
      )
    )
)

export const subscribeTasksByCircle = memoize(
  (orgId: string, circleId: string, done: boolean) =>
    subscribeQuery(
      query(
        collection,
        where('orgId', '==', orgId),
        where('circleId', '==', circleId),
        where('doneDate', done ? '!=' : '==', null),
        where('archived', '==', false)
      )
    )
)
