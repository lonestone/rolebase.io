import { OrgFragment } from '@gql'
import useOrg from './useOrg'
import { useOrgId } from './useOrgId'

export default function useCurrentOrg(): OrgFragment | undefined {
  const orgId = useOrgId()
  return useOrg(orgId)
}
