import { DocumentType, gql, MemberFragment } from '@gql'
import { SearchDoc, SearchTypes } from '@shared/model/search'
import { adminRequest } from '@utils/adminRequest'
import { IndexEntity } from './IndexEntity'

const Fragment = gql(`
  fragment MemberSearch on member {
    id
    orgId
    name
    description
    picture
  }
`)

const transform = (fragment: DocumentType<typeof Fragment>): SearchDoc => ({
  objectID: fragment.id,
  orgId: fragment.orgId,
  type: SearchTypes.Member,
  title: fragment.name,
  description: fragment.description,
  picture: fragment.picture || undefined,
  boost: 1,
})

export class IndexMember extends IndexEntity<MemberFragment> {
  static table = 'public.member'

  async getById(id: string) {
    const { member_by_pk: member } = await adminRequest(
      gql(`
        query GetMemberForSearch($id: uuid!) {
          member_by_pk(id: $id) {
            ...MemberSearch
          }
        }
      `),
      { id }
    )
    if (!member) return undefined
    return member && transform(member)
  }

  async getAll() {
    const { member } = await adminRequest(
      gql(`
        query GetMembersForSearch {
          member(where: { archived: { _eq: false } }) {
            ...MemberSearch
          }
        }
      `)
    )
    return member.map(transform)
  }
}
