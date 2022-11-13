import { WithId } from './types'

export interface TasksView {
  orgId: string
  tasksIds: string[]
}

export type TasksViewEntry = WithId<TasksView>
