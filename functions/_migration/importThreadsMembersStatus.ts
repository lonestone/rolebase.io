import { gql } from '@gql'
import { adminRequest } from '@utils/adminRequest'
import { Thread_Member_Status_Insert_Input } from '_gql/graphql'
import { getCollection } from './firebase'
import { id, oldIds } from './oldIds'
import { MemberThreadStatus as FirebaseMemberThreadStatus } from './_model/member'

export async function importThreadsMembersStatus() {
  // Get members status
  console.log('Importing threads members status...')
  const newMembersStatus: Thread_Member_Status_Insert_Input[] = []
  for (const [oldMemberId, { newId: newMemberId, type }] of oldIds) {
    if (type !== 'member') continue
    const threadStatus = await getCollection<FirebaseMemberThreadStatus>(
      `members/${oldMemberId}/threadStatus`
    ).get()

    for (const doc of threadStatus.docs) {
      const data = doc.data()

      let lastReadActivityId: string | null | undefined
      try {
        lastReadActivityId = id(data.lastReadActivityId)
      } catch (e) {
        lastReadActivityId = null
      }

      newMembersStatus.push({
        threadId: id(doc.id),
        memberId: newMemberId,
        lastReadActivityId,
        lastReadDate: data.lastReadDate.toDate().toISOString(),
      })
    }
  }

  // Insert members status
  await adminRequest(
    gql(`
      mutation ImportMembersStatus($objects: [thread_member_status_insert_input!]!) {
        insert_thread_member_status(objects: $objects) {
          returning {
            id
          }
        }
      }
    `),
    { objects: newMembersStatus }
  )
  console.log(`Importied ${newMembersStatus.length} threads members status.`)
}
