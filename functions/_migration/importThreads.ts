import { gql } from '@gql'
import { adminRequest } from '@utils/adminRequest'
import { Thread_Insert_Input } from '_gql/graphql'
import { getCollection } from './firebase'
import { getMemberIdFromUserId } from './getMemberIdFromUserId'
import { id, saveOldIds } from './oldIds'
import { Thread as FirebaseThread } from './_model/thread'

export async function importThreads() {
  console.log('Importing threads...')

  // Get all threads
  const threads = await getCollection<FirebaseThread>('threads').get()
  const newThreads: Thread_Insert_Input[] = []

  for (const doc of threads.docs) {
    const data = doc.data()
    const orgId = id(data.orgId)

    // Fix legacy userId
    if (!data.initiatorMemberId) {
      const i = await getMemberIdFromUserId(id((data as any).userId), orgId)
      if (i) {
        data.initiatorMemberId = i
      }
    } else {
      data.initiatorMemberId = id(data.initiatorMemberId)
    }

    newThreads.push({
      orgId,
      circleId: id(data.circleId),
      participantsScope: data.participantsScope,
      participantsMembersIds: data.participantsMembersIds.map(id),
      initiatorMemberId: data.initiatorMemberId,
      title: data.title || '',
      createdAt: data.createdAt.toDate().toISOString(),
      archived: data.archived,
    })
  }

  // Insert threads
  const result = await adminRequest(
    gql(`
      mutation ImportThreads($objects: [thread_insert_input!]!) {
        insert_thread(objects: $objects) {
          returning {
            id
          }
        }
      }
    `),
    { objects: newThreads }
  )

  await saveOldIds(
    'thread',
    threads.docs.map((doc, i) => ({
      oldId: doc.id,
      newId: result.insert_thread!.returning[i].id,
    }))
  )
}
