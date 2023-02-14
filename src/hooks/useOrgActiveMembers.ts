import { MemberFragment } from '@gql'
import { useStoreState } from '@store/hooks'

export default function useOrgActiveMembers(): MemberFragment[] {
  return useStoreState(
    (state) => state.org.members?.filter((e) => !!e.userId) ?? []
  )
}
