import { MemberFragment } from '@gql'
import { useUserId } from '@nhost/react'
import { useStoreState } from '@store/hooks'
import { useMemo } from 'react'

export default function useCurrentMember(): MemberFragment | undefined {
  const userId = useUserId()
  const members = useStoreState((state) => state.members.entries)

  return useMemo(() => {
    if (!userId) return undefined
    return members?.find((member) => member.userId === userId)
  }, [userId, members])
}
