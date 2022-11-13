import { gql } from '@gql'
import { adminRequest } from '@utils/adminRequest'
import { getCollection } from './firebase'
import { id, oldIds } from './oldIds'
import { TasksView as FirebaseTaskView } from './_model/tasksView'

export async function importTaskViews() {
  console.log('Importing task_views...')

  // Get all task_views
  const task_views = await getCollection<FirebaseTaskView>('tasksViews').get()
  const newTaskViews = task_views.docs.map((doc) => {
    const data = doc.data()

    // Replace ids in key
    let key = doc.id
    oldIds.forEach(({ newId }, oldId) => {
      key = key.replace(oldId, newId)
    })

    // Replace tasks ids
    const tasksIds = data.tasksIds
      .map((taskId) => {
        try {
          return id(taskId)
        } catch (e) {
          console.log(`Task ${taskId} doesn't exist`)
          return
        }
      })
      .filter(Boolean)

    return {
      orgId: id(data.orgId),
      key,
      tasksIds,
    }
  })

  // Insert task_views
  await adminRequest(
    gql(`
        mutation ImportTaskViews($objects: [task_view_insert_input!]!) {
          insert_task_view(objects: $objects) {
            returning {
              id
            }
          }
        }
      `),
    { objects: newTaskViews }
  )

  console.log(`Imported ${newTaskViews.length} tasks_views.`)
}
