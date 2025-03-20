import { router } from '../../trpc'
import archiveOrg from './archiveOrg'
import createOrg from './createOrg'
import getPublicData from './getPublicData'
import importOrg from './importOrg'
import updateOrgSlug from './updateOrgSlug'

export default router({
  archiveOrg,
  createOrg,
  getPublicData,
  importOrg,
  updateOrgSlug,
})
