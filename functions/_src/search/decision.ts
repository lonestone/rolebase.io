import { DecisionFragment, DocumentType, gql } from '@gql'
import { SearchDoc, SearchTypes } from '@shared/model/search'
import { adminRequest } from '@utils/adminRequest'
import { IndexEntity } from './IndexEntity'

const Fragment = gql(`
  fragment DecisionSearch on decision {
    id
    orgId
    title
    createdAt
  }
`)

const transform = (fragment: DocumentType<typeof Fragment>): SearchDoc => ({
  objectID: fragment.id,
  orgId: fragment.orgId,
  type: SearchTypes.Decision,
  title: fragment.title,
  description: '',
  createdAt: new Date(fragment.createdAt).getTime(),
  boost: 0,
})

export class IndexDecision extends IndexEntity<DecisionFragment> {
  static table = 'public.decision'

  async getById(id: string) {
    const { decision_by_pk: decision } = await adminRequest(
      gql(`
        query GetDecisionForSearch($id: uuid!) {
          decision_by_pk(id: $id) {
            ...DecisionSearch
          }
        }
      `),
      { id }
    )
    if (!decision) return undefined
    return decision && transform(decision)
  }

  async getAll() {
    const { decision } = await adminRequest(
      gql(`
        query GetDecisionsForSearch {
          decision(where: { archived: { _eq: false } }) {
            ...DecisionSearch
          }
        }
      `)
    )
    return decision.map(transform)
  }
}
