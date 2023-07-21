import { useNavigateOrg } from '@hooks/useNavigateOrg'
import { useCallback, useMemo } from 'react'
import { GraphEvents } from 'src/circles-viz/types'
import useAddCircleMember from './useAddCircleMember'
import useCopyCircle from './useCopyCircle'
import useMoveCircle from './useMoveCircle'
import useOrgMember from './useOrgMember'
import useRemoveCircleMember from './useRemoveCircleMember'

export default function useGraphEvents(): GraphEvents {
  const isMember = useOrgMember()
  const navigateOrg = useNavigateOrg()
  const moveCircle = useMoveCircle()
  const copyCircle = useCopyCircle()
  const addCircleMember = useAddCircleMember()
  const removeCircleMember = useRemoveCircleMember()

  // Navigation Events
  const onCircleClick = useCallback(
    (circleId: string) => navigateOrg(`roles?circleId=${circleId}`),
    []
  )
  const onMemberClick = useCallback(
    (circleId: string, memberId: string) =>
      navigateOrg(`roles?circleId=${circleId}&memberId=${memberId}`),
    []
  )

  // Move a circle member to another circle
  const onMemberMove = useCallback(
    async (
      memberId: string,
      parentCircleId: string,
      targetCircleId: string | null
    ) => {
      await removeCircleMember(parentCircleId, memberId)
      if (targetCircleId) {
        await addCircleMember(targetCircleId, memberId)
      }
    },
    []
  )

  // Add a member to a circle
  const onMemberAdd = useCallback(
    (memberId: string, circleId: string) => addCircleMember(circleId, memberId),
    []
  )

  return useMemo(
    () => ({
      onCircleClick,
      onMemberClick,
      onClickOutside: () => navigateOrg('roles'),
      onCircleMove: isMember ? moveCircle : undefined,
      onCircleCopy: isMember ? copyCircle : undefined,
      onMemberMove: isMember ? onMemberMove : undefined,
      onMemberAdd: isMember ? onMemberAdd : undefined,
    }),
    []
  )
}
