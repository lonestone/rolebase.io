import { router } from '../../trpc'
import archiveOrg from './archiveOrg'
import createOrg from './createOrg'
import importOrg from './importOrg'
import updateOrgSlug from './updateOrgSlug'

export default router({
  archiveOrg,
  createOrg,
  importOrg,
  updateOrgSlug,
})
