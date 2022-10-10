import { reindexAll } from '@search/index'
import { guardAdmin } from '@utils/guardAdmin'
import { route } from '@utils/route'

export default route(async (context): Promise<void> => {
  guardAdmin(context)
  await reindexAll()
})
