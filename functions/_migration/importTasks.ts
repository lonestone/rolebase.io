import { gql } from '@gql'
import { adminRequest } from '@utils/adminRequest'
import { getCollection } from './firebase'
import { id, saveOldIds } from './oldIds'
import { saveFilesFromTexts } from './saveFilesFromTexts'
import { Task as FirebaseTask } from './_model/task'

export async function importTasks() {
  console.log('Importing tasks...')

  // Get all tasks
  const tasks = await getCollection<FirebaseTask>('tasks').get()
  const newTasks = tasks.docs.map((doc) => {
    const data = doc.data()
    return {
      orgId: id(data.orgId),
      circleId: id(data.circleId),
      memberId: data.memberId ? id(data.memberId) : null,
      title: data.title || '',
      description: data.description || '',
      archived: data.archived,
      createdAt: data.createdAt.toDate().toISOString(),
      dueDate: data.dueDate ? data.dueDate.toDate().toISOString() : null,
      status: data.status,
    }
  })

  // Insert tasks
  const result = await adminRequest(
    gql(`
        mutation ImportTasks($objects: [task_insert_input!]!) {
          insert_task(objects: $objects) {
            returning {
              id
            }
          }
        }
      `),
    { objects: await saveFilesFromTexts(newTasks) }
  )

  await saveOldIds(
    'task',
    tasks.docs.map((doc, i) => ({
      oldId: doc.id,
      newId: result.insert_task!.returning[i].id,
    }))
  )
}
