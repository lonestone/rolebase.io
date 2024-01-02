import { Thread_Extra_Member_Insert_Input, gql } from '@gql'
import { adminRequest } from '@utils/adminRequest'
import { route } from '@utils/route'

export default route(async () => {
  const threads = await adminRequest(GET_THREADS)

  for (const thread of threads.thread) {
    if ((thread.participantsMembersIds?.length || 0) === 0) continue

    // Insert extra members
    try {
      await adminRequest(INSERT_THREAD_EXTRA_MEMBERS, {
        extra_members: thread.participantsMembersIds.map(
          (memberId): Thread_Extra_Member_Insert_Input => ({
            threadId: thread.id,
            memberId,
          })
        ),
      })
      console.log(`Migrated extra members of thread ${thread.id}`)
    } catch (e) {
      console.log(
        `Error migrating extra members of thread ${thread.id}: ${JSON.stringify(
          e
        )}`
      )
    }
  }

  return 'OK'
})

const GET_THREADS = gql(`
  query getThreadsForMigration {
    thread {
      id
      participantsMembersIds
    }
  }
`)

const INSERT_THREAD_EXTRA_MEMBERS = gql(`
  mutation insertThreadExtraMembers($extra_members: [thread_extra_member_insert_input!]!) {
    insert_thread_extra_member(objects: $extra_members) {
      returning {
        id
      }
    }
  }
`)
