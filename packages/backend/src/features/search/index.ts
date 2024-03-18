import { router } from '../../trpc'
import getAlgoliaConfig from './getAlgoliaConfig'
import reindexAll from './reindexAll'

export default router({
  getAlgoliaConfig,
  reindexAll,
})
