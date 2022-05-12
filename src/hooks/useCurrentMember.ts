import { MemberEntry } from '@shared/model/member'
import { useStoreState } from '@store/hooks'
import { useMemo } from 'react'

export default function useCurrentMember(): MemberEntry | undefined {
  const userId = useStoreState((state) => state.auth.user?.id)
  const members = useStoreState((state) => state.members.entries)

  return useMemo(() => {
    if (!userId) return undefined
    return members?.find((member) => member.userId === userId)
  }, [userId, members])
}
