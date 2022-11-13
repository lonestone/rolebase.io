import getAlgoliaIndex from '@utils/getAlgoliaClient'
import { IndexCircle } from './circle'
import { IndexDecision } from './decision'
import { IndexMeeting, IndexMeetingStep } from './meeting'
import { IndexMember } from './member'
import { IndexTask } from './task'
import { IndexThread } from './thread'

export const indexTables = [
  IndexCircle,
  IndexDecision,
  IndexMeeting,
  IndexMeetingStep,
  IndexMember,
  IndexTask,
  IndexThread,
]

export async function reindexAll() {
  const index = getAlgoliaIndex()
  for (const IndexTable of indexTables) {
    console.log(`Indexing ${IndexTable.table}...`)
    const docs = await new IndexTable().getAll()
    await index.saveObjects(docs)
    console.log(`Indexed ${docs.length} docs.`)
  }
}
