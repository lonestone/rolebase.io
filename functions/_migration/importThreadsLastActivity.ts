import { gql } from '@gql'
import { adminRequest } from '@utils/adminRequest'
import { getCollection } from './firebase'
import { id } from './oldIds'
import { Thread as FirebaseThread } from './_model/thread'

export async function importThreadsLastActivity() {
  // Set lastActivityId and lastActivityDate in thread
  console.log('Updating threads last activity...')
  const threads = await getCollection<FirebaseThread>('threads').get()
  let n = 0

  for (const doc of threads.docs) {
    const data = doc.data()
    if (!data.lastActivityId || !data.lastActivityDate) continue
    await adminRequest(
      gql(`
        mutation UpdateThreadLastActivity($id: uuid!, $lastActivityId: uuid!, $lastActivityDate: timestamptz) {
          update_thread_by_pk(pk_columns: { id: $id }, _set: { lastActivityId: $lastActivityId, lastActivityDate: $lastActivityDate }) {
            id
          }
        }
      `),
      {
        id: id(doc.id),
        lastActivityId: id(data.lastActivityId),
        lastActivityDate: data.lastActivityDate.toDate().toISOString(),
      }
    )
    n++
  }
  console.log(`Updated ${n} threads last activity.`)
}
