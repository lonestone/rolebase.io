import * as functions from 'firebase-functions'
import { guarSuperAdmin } from '../helpers/guards'
import { reindexAll } from '../search'

export const searchReindexAll = functions
  .runWith({ timeoutSeconds: 540 })
  .https.onCall(async (d, context) => {
    await guarSuperAdmin(context)
    await reindexAll()
  })
