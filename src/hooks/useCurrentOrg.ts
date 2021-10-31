import { OrgEntry } from '@shared/orgs'
import { useStoreState } from '../components/store/hooks'
import useOrg from './useOrg'

export default function useCurrentOrg(): OrgEntry | undefined {
  const orgId = useStoreState((state) => state.orgs.currentId)
  return useOrg(orgId)
}
