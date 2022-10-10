import { gql } from '@gql'
import { VideoConfTypes } from '@shared/model/meeting'
import { adminRequest } from '@utils/adminRequest'
import { Meeting_Insert_Input } from '_gql/graphql'
import { getCollection } from './firebase'
import { id, saveOldIds } from './oldIds'
import { Meeting as FirebaseMeeting } from './_model/meeting'

export async function importMeetings() {
  console.log('Importing meetings...')

  // Get all meetings
  const meetings = await getCollection<FirebaseMeeting>('meetings').get()
  const newMeetings: Meeting_Insert_Input[] = []

  for (const doc of meetings.docs) {
    const data = doc.data()

    newMeetings.push({
      orgId: id(data.orgId),
      circleId: id(data.circleId),
      participantsScope: data.participantsScope,
      participantsMembersIds: data.participantsMembersIds.map(id),
      initiatorMemberId: id(data.initiatorMemberId),
      facilitatorMemberId: id(data.facilitatorMemberId),
      createdAt: data.createdAt.toDate().toISOString(),
      startDate: data.startDate.toDate().toISOString(),
      endDate: data.endDate.toDate().toISOString(),
      ended: data.ended,
      title: data.title || '',
      attendees: data.attendees
        ?.map((a) => {
          try {
            return {
              memberId: id(a.memberId),
              circlesIds: a.circlesIds
                .map((circleId) => {
                  try {
                    return id(circleId)
                  } catch (e) {
                    return
                  }
                })
                .filter(Boolean),
              present: a.present,
            }
          } catch (e) {
            return
          }
        })
        .filter(Boolean),
      stepsConfig: data.stepsConfig,
      archived: data.archived,
      videoConf:
        data.videoConf === true
          ? { type: VideoConfTypes.Jitsi }
          : typeof data.videoConf === 'string'
          ? { type: VideoConfTypes.Url, url: data.videoConf }
          : null,
    })
  }

  // Insert meetings
  const result = await adminRequest(
    gql(`
      mutation ImportMeetings($objects: [meeting_insert_input!]!) {
        insert_meeting(objects: $objects) {
          returning {
            id
          }
        }
      }
    `),
    { objects: newMeetings }
  )

  await saveOldIds(
    'meeting',
    meetings.docs.map((doc, i) => ({
      oldId: doc.id,
      newId: result.insert_meeting!.returning[i].id,
    }))
  )
}
