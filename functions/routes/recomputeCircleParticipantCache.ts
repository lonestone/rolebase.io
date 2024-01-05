import CircleParticipantsCache from '@utils/CircleParticipantsCache'
import { guardAdmin } from '@utils/guardAdmin'
import { route } from '@utils/route'

export default route(async (context): Promise<void> => {
  guardAdmin(context)
  await CircleParticipantsCache.recomputeAll()
})
