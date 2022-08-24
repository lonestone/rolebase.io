import getAlgoliaIndex from '../helpers/getAlgoliaClient'
import { indexCircles } from './circles'
import { indexDecisions } from './decisions'
import { indexMeetings } from './meetings'
import { indexMembers } from './member'
import { indexTasks } from './tasks'
import { indexThreads } from './threads'

export async function reindexAll() {
  const index = getAlgoliaIndex()
  await Promise.all([
    indexCircles(index),
    indexDecisions(index),
    indexMeetings(index),
    indexMembers(index),
    indexTasks(index),
    indexThreads(index),
  ])
}
