import { CircleFragment, DocumentType, gql, RoleFragment } from '@gql'
import { SearchDoc, SearchTypes } from '@shared/model/search'
import { adminRequest } from '@utils/adminRequest'
import { HasuraEvent } from '@utils/nhost'
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

export class IndexCircle extends IndexEntity<CircleFragment> {
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

// When a role is updated, we need to update the circles that use it
export class IndexRole extends IndexEntity<RoleFragment> {
  static table = 'public.role'

  async applyEvent(event: HasuraEvent<RoleFragment>) {
    const { data } = event.event
    const id = data.new?.id ?? data.old?.id

    // Have name changed?
    if (id && data.new?.name !== data.old?.name) {
      const { role } = await adminRequest(
        gql(`
          query GetRoleCirclesForSearch($id: uuid!) {
            role(where: { id: { _eq: $id } }) {
              circles(where: { archived: { _eq: false } }) {
                ...CircleSearch
              }
            }
          }
        `),
        { id }
      )

      // Update circles
      const circleDocs = role[0].circles.map(transform)
      await this.index.saveObjects(circleDocs).catch(console.error)
    }
  }
}
