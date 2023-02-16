import { DocumentType, gql, TaskFragment } from '@gql'
import { SearchDoc, SearchTypes } from '@shared/model/search'
import { adminRequest } from '@utils/adminRequest'
import { IndexEntity } from './IndexEntity'

const Fragment = gql(`
  fragment TaskSearch on task {
    id
    orgId
    title
    createdAt
  }
`)

const transform = (fragment: DocumentType<typeof Fragment>): SearchDoc => ({
  objectID: fragment.id,
  orgId: fragment.orgId,
  type: SearchTypes.Task,
  title: fragment.title,
  description: '',
  createdAt: fragment.createdAt,
  boost: 0,
})

export class IndexTask extends IndexEntity<TaskFragment> {
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
