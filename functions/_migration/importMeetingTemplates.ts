import { gql } from '@gql'
import { adminRequest } from '@utils/adminRequest'
import { getCollection } from './firebase'
import { id } from './oldIds'
import { MeetingTemplate as FirebaseMeetingTemplate } from './_model/meetingTemplate'

export async function importMeetingTemplates() {
  console.log('Importing meetingTemplates...')

  // Get all meetingTemplates
  const meetingTemplates = await getCollection<FirebaseMeetingTemplate>(
    'meetingTemplates'
  ).get()
  const newMeetingTemplates = meetingTemplates.docs.map((doc) => {
    const data = doc.data()
    return {
      orgId: id(data.orgId),
      title: data.title,
      stepsConfig: data.stepsConfig,
    }
  })

  // Insert meetingTemplates
  await adminRequest(
    gql(`
      mutation ImportMeetingTemplates($objects: [meeting_template_insert_input!]!) {
        insert_meeting_template(objects: $objects) {
          returning {
            id
          }
        }
      }
    `),
    { objects: newMeetingTemplates }
  )

  console.log(`Imported ${newMeetingTemplates.length} meetingTemplates.`)
}
