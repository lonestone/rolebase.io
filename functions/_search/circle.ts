import { DocumentType, gql } from '@gql'
import { CircleEntry } from '@shared/model/circle'
import { SearchDoc, SearchTypes } from '@shared/model/search'
import { adminRequest } from '@utils/adminRequest'
import { IndexEntity } from './IndexEntity'

const Fragment = gql(`
  fragment CircleSearch on circle {
    id
    orgId
    role {
      name
    }
    parent {
      role {
        name
      }
      parent {
        role {
          name
        }
      }
      parent {
        role {
          name
        }
      }
    }
  }
`)

interface CircleName {
  role: { name: string }
  parent?: CircleName | null
}

// Build circle name with its role name and its parents' role names
const buildName = (circle: CircleName) =>
  (circle.parent ? buildName(circle.parent) + ' › ' : '') + circle.role.name

const transform = (fragment: DocumentType<typeof Fragment>): SearchDoc => ({
  objectID: fragment.id,
  orgId: fragment.orgId,
  type: SearchTypes.Circle,
  title: buildName(fragment),
  description: '',
  boost: 2,
})

export class IndexCircle extends IndexEntity<CircleEntry> {
  static table = 'public.circle'

  async getById(id: string) {
    const { circle_by_pk: circle } = await adminRequest(
      gql(`
        query GetCircleForSearch($id: uuid!) {
          circle_by_pk(id: $id) {
            ...CircleSearch
          }
        }
      `),
      { id }
    )
    if (!circle) return undefined
    return circle && transform(circle)
  }

  async getAll() {
    const { circle } = await adminRequest(
      gql(`
        query GetCirclesForSearch {
          circle(where: { archived: { _eq: false } }) {
            ...CircleSearch
          }
        }
      `)
    )
    return circle.map(transform)
  }
}
