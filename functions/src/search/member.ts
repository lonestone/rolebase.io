import { Member } from '@shared/model/member'
import { SearchTypes } from '@shared/model/search'
import { collections } from '../firebase'
import { getIndexEntities } from '../helpers/getIndexEntities'
import { getIndexEntity } from '../helpers/getIndexEntity'
import { getUpdateSearchHandler } from '../helpers/getUpdateSearchHandler'

const indexMember = getIndexEntity<Member>(SearchTypes.Member, {
  getTitle: (member) => member.name,
  getDescription: (member) => member.description,
  getPicture: (member) => member.picture || undefined,
})

export const indexMembers = getIndexEntities(collections.members, indexMember)

export const onMemberUpdateSearch = getUpdateSearchHandler(
  'members/{id}',
  indexMember
)
