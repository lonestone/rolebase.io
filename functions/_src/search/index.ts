import getAlgoliaIndex from '@utils/getAlgoliaClient'
import { IndexCircle } from './circle'
import { IndexCircleLink } from './circle_link'
import { IndexCircleMember } from './circle_member'
import { IndexDecision } from './decision'
import { IndexMeeting } from './meeting'
import { IndexMeetingAttendee } from './meeting_attendee'
import { IndexMeetingRecurring } from './meeting_recurring'
import { IndexMeetingStep } from './meeting_step'
import { IndexMember } from './member'
import { IndexRole } from './role'
import { IndexTask } from './task'
import { IndexThread, IndexThreadActivity } from './thread'

export const indexTables = [
  IndexCircle,
  IndexCircleLink,
  IndexCircleMember,
  IndexDecision,
  IndexMeeting,
  IndexMeetingAttendee,
  IndexMeetingRecurring,
  IndexMeetingStep,
  IndexMember,
  IndexRole,
  IndexTask,
  IndexThread,
  IndexThreadActivity,
]

export async function reindexAll() {
  const index = getAlgoliaIndex()

  // Remove all existing objects
  index.clearObjects()

  // Index all objects from database
  for (const IndexTable of indexTables) {
    console.log(`Indexing ${IndexTable.table}...`)
    const docs = await new IndexTable().getAll()
    await index.saveObjects(docs)
    console.log(`Indexed ${docs.length} docs.`)
  }
}
