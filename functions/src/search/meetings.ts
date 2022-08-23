import { Meeting } from '@shared/model/meeting'
import { MeetingStep } from '@shared/model/meetingStep'
import { SearchTypes } from '@shared/model/search'
import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import { collections } from '../firebase'
import getAlgoliaIndex from '../helpers/getAlgoliaClient'
import { getIndexEntities } from '../helpers/getIndexEntities'
import { getIndexEntity } from '../helpers/getIndexEntity'
import { getUpdateSearchHandler } from '../helpers/getUpdateSearchHandler'
import { getDocData, getQuerySnapshotData } from '../utils'

const indexMeeting = getIndexEntity<Meeting>(SearchTypes.Meeting, {
  async getTitle(meeting) {
    // Get role name
    const circle = getDocData(
      await collections.circles.doc(meeting.circleId).get()
    )
    const role = getDocData(await collections.roles.doc(circle.roleId).get())
    return `${role.name} - ${meeting.title}`
  },

  async getDescription(meeting, doc) {
    // Get meeting steps
    const steps = getQuerySnapshotData(
      (await doc.ref
        .collection('steps')
        .get()) as admin.firestore.QuerySnapshot<MeetingStep>
    )
    return steps.map(({ notes }) => notes).join('\n')
  },
})

export const indexMeetings = getIndexEntities(
  collections.meetings,
  indexMeeting
)

export const onMeetingUpdateSearch = getUpdateSearchHandler(
  'meetings/{id}',
  indexMeeting
)

export const onMeetingStepUpdateSearch = functions.firestore
  .document('meetings/{meetingId}/steps/{stepId}')
  .onWrite(async (change, context) => {
    if (!change.after.exists) return
    const index = getAlgoliaIndex()
    const meetingDoc = await collections.meetings
      .doc(context.params.meetingId)
      .get()
    indexMeeting(index, meetingDoc)
  })
