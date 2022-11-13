import { gql } from '@gql'
import { adminRequest } from '@utils/adminRequest'
import { getCollection } from './firebase'
import { id, saveOldIds } from './oldIds'
import { saveMemberPicture } from './saveMemberPicture'
import { Member as FirebaseMember } from './_model/member'

export async function importMembers() {
  console.log('Importing members...')

  // Get all members
  const members = await getCollection<FirebaseMember>('members').get()
  const newMembers = members.docs.map((doc) => {
    const data = doc.data()
    return {
      orgId: id(data.orgId),
      userId: data.userId ? id(data.userId) : null,
      name: data.name,
      description: data.description,
      inviteDate: data.inviteDate?.toDate().toISOString(),
      inviteEmail: data.inviteEmail,
      role: data.role,
      workedMinPerWeek: data.workedMinPerWeek,
      archived: data.archived,
    }
  })

  // Insert members
  const result = await adminRequest(
    gql(`
        mutation ImportMembers($objects: [member_insert_input!]!) {
          insert_member(objects: $objects) {
            returning {
              id
            }
          }
        }
      `),
    { objects: newMembers }
  )

  await saveOldIds(
    'member',
    members.docs.map((doc, i) => ({
      oldId: doc.id,
      newId: result.insert_member!.returning[i].id,
    }))
  )

  for (const doc of members.docs) {
    const data = doc.data()
    if (!data.picture) continue
    try {
      await saveMemberPicture(data.orgId, id(data.orgId), doc.id, id(doc.id))
    } catch (error) {
      console.error('saveMemberPicture error:', error.message)
    }
  }
}
