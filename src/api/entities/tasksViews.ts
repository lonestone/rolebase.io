import { getCollection } from '@api/helpers/getCollection'
import { getEntityMethods } from '@api/helpers/getEntityMethods'
import { TasksView } from '@shared/model/tasksView'

export const collection = getCollection<TasksView>('tasksViews')

const methods = getEntityMethods(collection)
export const getTasksView = methods.get
export const createTasksView = methods.create
export const updateTasksView = methods.update
export const subscribeTasksView = methods.subscribe
export const deleteTasksView = methods.delete
