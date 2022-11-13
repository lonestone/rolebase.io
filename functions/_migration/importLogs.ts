import { gql } from '@gql'
import { adminRequest } from '@utils/adminRequest'
import { Log_Insert_Input } from '_gql/graphql'
import { getCollection } from './firebase'
import { getMemberIdFromUserId } from './getMemberIdFromUserId'
import { id, replaceIdsInTexts } from './oldIds'
import { Log as FirebaseLog } from './_model/log'

export async function importLogs() {
  console.log('Importing logs...')

  // Get all logs
  const logs = await getCollection<FirebaseLog>('logs').get()
  const newLogs: Log_Insert_Input[] = []

  for (const doc of logs.docs) {
    const data = doc.data()

    try {
      id(data.orgId)
    } catch (e) {
      console.log(`Log ${doc.id} doesn't have orgId`)
    }
    try {
      id(data.userId)
    } catch (e) {
      console.log(`Log ${doc.id} doesn't have userId`)
    }

    const orgId = id(data.orgId)
    const userId = id(data.userId)

    let memberId: string | undefined
    if (data.memberId) {
      memberId = id(data.memberId)
    } else {
      memberId = await getMemberIdFromUserId(userId, orgId)
    }
    if (!memberId) {
      throw new Error(`Log ${doc.id} doesn't have memberId`)
    }

    try {
      if (data.meetingId) id(data.meetingId)
    } catch (e) {
      console.log(`Log ${doc.id} doesn't have meetingId`)
    }
    try {
      if (data.cancelMemberId) id(data.cancelMemberId)
    } catch (e) {
      console.log(`Log ${doc.id} doesn't have cancelMemberId`)
    }

    newLogs.push({
      orgId,
      userId,
      memberId,
      memberName: data.memberName,
      meetingId: data.meetingId ? id(data.meetingId) : null,
      createdAt: data.createdAt.toDate().toISOString(),
      display: replaceIdsInTexts(data.display),
      changes: replaceIdsInTexts(data.changes),
      cancelMemberId: data.cancelMemberId ? id(data.cancelMemberId) : null,
      cancelMemberName: data.cancelMemberName,
      canceled: data.canceled,
    })
  }

  // Insert logs
  const result = await adminRequest(
    gql(`
        mutation ImportLogs($objects: [log_insert_input!]!) {
          insert_log(objects: $objects) {
            returning {
              id
            }
          }
        }
      `),
    { objects: newLogs }
  )

  const logsIds = new Map<string, string>()
  result.insert_log!.returning.forEach((log, i) => {
    logsIds.set(logs.docs[i].id, log.id)
  })

  // Update cancelLogId in logs
  console.log('Updating cancelLogId in logs...')
  for (const doc of logs.docs) {
    const data = doc.data()
    if (data.cancelLogId) {
      const cancelLogId = logsIds.get(data.cancelLogId)
      const logId = logsIds.get(doc.id)
      await adminRequest(
        gql(`
          mutation UpdateLog($id: uuid!, $cancelLogId: uuid!) {
            update_log_by_pk(pk_columns: { id: $id }, _set: { cancelLogId: $cancelLogId }) {
              id
            }
          }
        `),
        { id: logId, cancelLogId }
      )
    }
  }
  console.log(`Updated ${logs.docs.length} logs.`)
}
