import { DocumentType, gql, ThreadFragment } from '@gql'
import { SearchDoc, SearchTypes } from '@shared/model/search'
import { adminRequest } from '@utils/adminRequest'
import { IndexEntity } from './IndexEntity'

const Fragment = gql(`
  fragment ThreadSearch on thread {
    id
    orgId
    title
    createdAt
  }
`)

const transform = (fragment: DocumentType<typeof Fragment>): SearchDoc => ({
  objectID: fragment.id,
  orgId: fragment.orgId,
  type: SearchTypes.Thread,
  title: fragment.title,
  description: '',
  createdAt: new Date(fragment.createdAt).getTime(),
  boost: 0,
})

export class IndexThread extends IndexEntity<ThreadFragment> {
  static table = 'public.thread'

  async getById(id: string) {
    const { thread_by_pk: thread } = await adminRequest(
      gql(`
        query GetThreadForSearch($id: uuid!) {
          thread_by_pk(id: $id) {
            ...ThreadSearch
          }
        }
      `),
      { id }
    )
    if (!thread) return undefined
    return thread && transform(thread)
  }

  async getAll() {
    const { thread } = await adminRequest(
      gql(`
        query GetThreadsForSearch {
          thread(where: { archived: { _eq: false } }) {
            ...ThreadSearch
          }
        }
      `)
    )
    return thread.map(transform)
  }
}
