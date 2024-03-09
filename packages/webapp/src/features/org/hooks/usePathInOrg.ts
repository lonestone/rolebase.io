import { getOrgPath } from '@rolebase/shared/helpers/getOrgPath'
import useCurrentOrg from './useCurrentOrg'
import { useOrgId } from './useOrgId'

export function usePathInOrg(path: string) {
  const orgId = useOrgId()
  const org = useCurrentOrg()
  if (!org && !orgId) return ''

  return `${org ? getOrgPath(org) : `/orgs/${orgId}`}/${path}`
}
