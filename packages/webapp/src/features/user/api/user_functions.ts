import { fn } from '../../common/api/functions'

export const searchReindexAll = fn('searchReindexAll')
export const recomputeCircleParticipantCache = fn(
  'recomputeCircleParticipantCache'
)
export const replaceOldIds = fn<{ text: string }, string>('replaceOldIds')
