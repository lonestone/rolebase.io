import { SearchTypes } from '@shared/model/search'
import { Thread } from '@shared/model/thread'
import { collections } from '../firebase'
import { getIndexEntities } from '../helpers/getIndexEntities'
import { getIndexEntity } from '../helpers/getIndexEntity'
import { getUpdateSearchHandler } from '../helpers/getUpdateSearchHandler'

const indexThread = getIndexEntity<Thread>(SearchTypes.Thread, {
  getTitle: (thread) => thread.title,
})

export const indexThreads = getIndexEntities(collections.threads, indexThread)

export const onThreadUpdateSearch = getUpdateSearchHandler(
  'threads/{id}',
  indexThread
)
