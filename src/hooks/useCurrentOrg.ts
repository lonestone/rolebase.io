import { OrgFragment } from '@gql'
import { useStoreState } from '@store/hooks'

export default function useCurrentOrg(): OrgFragment | undefined {
  return useStoreState((state) => state.orgs.current)
}
