import { getCollection } from '@api/helpers/getCollection'
import { getEntityMethods } from '@api/helpers/getEntityMethods'
import { subscribeQuery } from '@api/helpers/subscribeQuery'
import { Task, TaskStatus } from '@shared/model/task'
import { Optional } from '@shared/model/types'
import { query, QueryConstraint, Timestamp, where } from 'firebase/firestore'
import { memoize } from 'src/memoize'

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

// Subscribe to tasks assigned to a member or a circle
// If status is provided, get tasks by status
// Else, get all tasks that are not done
export const subscribeTasks = memoize(
  (
    orgId: string,
    memberId?: string,
    circleId?: string,
    status?: TaskStatus
  ) => {
    const constraints: QueryConstraint[] = []
    if (memberId) {
      constraints.push(where('memberId', '==', memberId))
    }
    if (circleId) {
      constraints.push(where('circleId', '==', circleId))
    }
    return subscribeQuery(
      query(
        collection,
        where('orgId', '==', orgId),
        where('status', status ? '==' : '!=', status || TaskStatus.Done),
        where('archived', '==', false),
        ...constraints
      )
    )
  }
)
