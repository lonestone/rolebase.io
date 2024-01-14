import { fn } from '../../common/api/functions'

export const createOrg = fn<{ name: string; slug: string }, string>(
  'orgs/createOrg'
)

export const updateOrgSlug = fn<{ orgId: string; slug: string }>(
  'orgs/updateOrgSlug'
)

export const archiveOrg = fn<{
  orgId: string
}>('orgs/archiveOrg')

export const importOrg = fn<{ provider: string; fileId: string }, string>(
  'orgs/importOrg'
)
