import { gql } from '@gql'
import { adminRequest } from '@utils/adminRequest'
import { getCollection } from './firebase'
import { id } from './oldIds'
import { Meeting as FirebaseMeeting } from './_model/meeting'

export async function importMeetingsCurrentStep() {
  console.log('Updating meetings current step...')
  const meetings = await getCollection<FirebaseMeeting>('meetings').get()
  let n = 0

  for (const doc of meetings.docs) {
    const data = doc.data()
    if (!data.currentStepId) continue

    let currentStepId: string | undefined
    try {
      currentStepId = id(id(doc.id) + data.currentStepId)
    } catch (e) {
      console.log('Meeting step not found', doc.id, data.currentStepId)
      continue
    }

    await adminRequest(
      gql(`
        mutation UpdateMeetingCurrentStep($id: uuid!, $currentStepId: uuid!) {
          update_meeting_by_pk(pk_columns: { id: $id }, _set: { currentStepId: $currentStepId }) {
            id
          }
        }
      `),
      {
        id: id(doc.id),
        currentStepId,
      }
    )
    n++
  }
  console.log(`Updated ${n} meetings current step.`)
}
