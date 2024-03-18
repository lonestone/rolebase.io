import { adminProcedure } from '../../trpc/adminProcedure'
import getAlgoliaIndex from '../../utils/getAlgoliaClient'
import { indexTables } from '../trigger/entities'

export default adminProcedure.mutation(async () => {
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
})
