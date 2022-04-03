import { subscribeIdsChunks } from '@api/helpers/subscribeIdsChunks'
import { Task, TaskEntry, TaskStatus } from '@shared/task'
import { Optional } from '@shared/types'
import { query, Timestamp, where } from 'firebase/firestore'
import { memoize } from 'src/memoize'
import {
  getCollection,
  getEntityMethods,
  subscribeQuery,
  SubscriptionFn,
} from '../firebase'

export const collection = getCollection<Task>('tasks')

const methods = getEntityMethods(collection, {
  createTransform: (
    task: Optional<Task, 'createdAt' | 'status' | 'archived'>
  ) => ({
    createdAt: Timestamp.now(),
    status: TaskStatus.Open,
    archived: false,
    ...task,
  }),
})
export const getTask = methods.get
export const createTask = methods.create
export const updateTask = methods.update
export const subscribeTask = methods.subscribe
export const deleteTask = methods.delete

// Subscribe to tasks assigned to a member
// If status is provided, get tasks by status
// Else, get all tasks that are not done
export const subscribeAllTasks = memoize((orgId: string, status?: TaskStatus) =>
  subscribeQuery(
    query(
      collection,
      where('orgId', '==', orgId),
      where('status', status ? '==' : '!=', status || TaskStatus.Done),
      where('archived', '==', false)
    )
  )
)

// Subscribe to tasks assigned to a member
// If status is provided, get tasks by status
// Else, get all tasks that are not done
export const subscribeTasksByMember = memoize(
  (orgId: string, memberId: string, status?: TaskStatus) =>
    subscribeQuery(
      query(
        collection,
        where('orgId', '==', orgId),
        where('memberId', '==', memberId),
        where('status', status ? '==' : '!=', status || TaskStatus.Done),
        where('archived', '==', false)
      )
    )
)

// Subscribe to tasks in a circle
// If status is provided, get tasks by status
// Else, get all tasks that are not done
export const subscribeTasksByCircle = memoize(
  (orgId: string, circleId: string, status?: TaskStatus) =>
    subscribeQuery(
      query(
        collection,
        where('orgId', '==', orgId),
        where('circleId', '==', circleId),
        where('status', status ? '==' : '!=', status || TaskStatus.Done),
        where('archived', '==', false)
      )
    )
)

export const subscribeTasksByIds = memoize(
  (ids: string[]): SubscriptionFn<TaskEntry[]> =>
    subscribeIdsChunks(ids, (constraint) => query(collection, constraint))
)
