import { OrgEntry } from '@shared/model/org'
import useOrg from './useOrg'
import { useOrgId } from './useOrgId'

export default function useCurrentOrg(): OrgEntry | undefined {
  const orgId = useOrgId()
  return useOrg(orgId)
}
