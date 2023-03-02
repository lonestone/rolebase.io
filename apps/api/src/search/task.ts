import { DocumentType, gql } from '@gql'
import { SearchDoc, SearchTypes } from '@shared/model/search'
import { TaskEntry } from '@shared/model/task'
import { adminRequest } from '@utils/adminRequest'
import { IndexEntity } from './IndexEntity'

const Fragment = gql(`
  fragment TaskSearch on task {
    id
    orgId
    title
  }
`)

const transform = (fragment: DocumentType<typeof Fragment>): SearchDoc => ({
  objectID: fragment.id,
  orgId: fragment.orgId,
  type: SearchTypes.Task,
  title: fragment.title,
  description: '',
  boost: 0,
})

export class IndexTask extends IndexEntity<TaskEntry> {
  static table = 'public.task'

  async getById(id: string) {
    const { task_by_pk: task } = await adminRequest(
      gql(`
        query GetTaskForSearch($id: uuid!) {
          task_by_pk(id: $id) {
            ...TaskSearch
          }
        }
      `),
      { id }
    )
    if (!task) return undefined
    return task && transform(task)
  }

  async getAll() {
    const { task } = await adminRequest(
      gql(`
        query GetTasksForSearch {
          task(where: { archived: { _eq: false } }) {
            ...TaskSearch
          }
        }
      `)
    )
    return task.map(transform)
  }
}
