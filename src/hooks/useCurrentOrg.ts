import { OrgEntry } from '@shared/org'
import { useStoreState } from '../store/hooks'
import useOrg from './useOrg'

export default function useCurrentOrg(): OrgEntry | undefined {
  const orgId = useStoreState((state) => state.orgs.currentId)
  return useOrg(orgId)
}
