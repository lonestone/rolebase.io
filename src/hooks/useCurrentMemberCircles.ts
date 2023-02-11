import { CircleWithRoleFragment } from '@gql'
import { getParticipantCircles } from '@shared/helpers/getParticipantCircles'
import { useStoreState } from '@store/hooks'
import { useMemo } from 'react'
import useCurrentMember from './useCurrentMember'

export default function useCurrentMemberCircles():
  | CircleWithRoleFragment[]
  | undefined {
  const currentMember = useCurrentMember()
  const circles = useStoreState((state) => state.org.circles)

  return useMemo(() => {
    if (!currentMember || !circles) return
    return getParticipantCircles(currentMember.id, circles)
  }, [currentMember, circles])
}
