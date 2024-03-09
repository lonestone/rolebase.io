import { adminProcedure } from '../../trpc/adminProcedure'
import CircleParticipantsCache from './CircleParticipantsCache'

export default adminProcedure.mutation(async () => {
  await CircleParticipantsCache.recomputeAll()
})
