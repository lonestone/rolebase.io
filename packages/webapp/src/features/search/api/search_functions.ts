import { AlgoliaConfig } from '@shared/model/search'
import { fn } from '../../common/api/functions'

export const getAlgoliaConfig = fn<{ orgId: string }, AlgoliaConfig>(
  'getAlgoliaConfig'
)
