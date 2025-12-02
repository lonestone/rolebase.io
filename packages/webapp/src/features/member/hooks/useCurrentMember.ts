import { useAuth } from '@/user/hooks/useAuth'
import { MemberFragment } from '@gql'
import { useStoreState } from '@store/hooks'
import { useMemo } from 'react'

export default function useCurrentMember(): MemberFragment | undefined {
  const { user } = useAuth()
  const members = useStoreState((state) => state.org.members)

  return useMemo(() => {
    if (!user) return undefined
    return members?.find((member) => member.userId === user.id)
  }, [user?.id, members])
}
