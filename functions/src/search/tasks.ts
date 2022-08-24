import { SearchTypes } from '@shared/model/search'
import { Task } from '@shared/model/task'
import { collections } from '../firebase'
import { getIndexEntities } from '../helpers/getIndexEntities'
import { getIndexEntity } from '../helpers/getIndexEntity'
import { getUpdateSearchHandler } from '../helpers/getUpdateSearchHandler'

const indexTask = getIndexEntity<Task>(SearchTypes.Task, {
  getTitle: (task) => task.title,
})

export const indexTasks = getIndexEntities(collections.tasks, indexTask)

export const onTaskUpdateSearch = getUpdateSearchHandler(
  'tasks/{id}',
  indexTask
)
