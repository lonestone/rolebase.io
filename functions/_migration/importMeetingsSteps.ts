import { gql } from '@gql'
import { MeetingStep, MeetingStepTypes } from '@shared/model/meeting_step'
import { adminRequest } from '@utils/adminRequest'
import { Meeting_Step_Insert_Input } from '_gql/graphql'
import { getCollection } from './firebase'
import { id, oldIds, saveOldIds } from './oldIds'
import { saveFilesFromTexts } from './saveFilesFromTexts'
import { MeetingStep as FirebaseMeetingStep } from './_model/meetingStep'

export async function importMeetingsSteps() {
  console.log('Importing meetings steps...')

  // Get all meetings steps
  const newSteps: Meeting_Step_Insert_Input[] = []
  for (const [oldMeetingId, { newId: newMeetingId, type }] of oldIds) {
    if (type !== 'meeting') continue
    const answers = await getCollection<FirebaseMeetingStep>(
      `meetings/${oldMeetingId}/steps`
    ).get()
    for (const doc of answers.docs) {
      const data = doc.data()

      let stepData: MeetingStep['data'] = {}

      if (data.type === MeetingStepTypes.Threads) {
        stepData = {
          threadsIds: data.threadsIds.map(id),
        }
      }
      if (data.type === MeetingStepTypes.Tasks) {
        stepData = {
          viewType: data.viewType,
          filterStatus: data.filterStatus,
          filterMemberId: data.filterMemberId ? id(data.filterMemberId) : null,
        }
      }

      newSteps.push({
        meetingId: newMeetingId,
        stepConfigId: doc.id,
        notes: data.notes || '',
        type: data.type,
        data: stepData,
      })
    }
  }

  // Insert all meetings steps
  const result = await adminRequest(
    gql(`
      mutation InsertMeetingSteps($objects: [meeting_step_insert_input!]!) {
        insert_meeting_step(objects: $objects) {
          returning {
            id
          }
        }
      }
    `),
    { objects: await saveFilesFromTexts(newSteps) }
  )

  await saveOldIds(
    'meeting_step',
    newSteps.map((step, i) => ({
      oldId: step.meetingId + step.stepConfigId!,
      newId: result.insert_meeting_step!.returning[i].id,
    }))
  )
}
