import { WithId } from './types'

// This collection contains ordered lists of tasks ids
// for specific views (e.g. tasks assigned to a member)

export interface TasksView {
  orgId: string
  tasksIds: string[]
}

export type TasksViewEntry = WithId<TasksView>
