import { addMemberToCircle } from '@api/entities/circles'
import { FormControl, FormLabel, useDisclosure } from '@chakra-ui/react'
import CircleMemberDeleteModal from '@components/organisms/modals/CircleMemberDeleteModal'
import useCircleAndParents from '@hooks/useCircleAndParents'
import { useNavigateOrg } from '@hooks/useNavigateOrg'
import React, { useCallback, useMemo, useState } from 'react'
import MembersSelect from './MembersSelect'

interface Props {
  circleId: string
}

export default function CircleMemberFormControl({ circleId }: Props) {
  const circleAndParents = useCircleAndParents(circleId)
  const circle = circleAndParents?.[circleAndParents.length - 1]
  const role = circle?.role

  const membersIds = useMemo(
    () => circle?.members.map((m) => m.memberId),
    [circle]
  )

  const handleAddMember = useCallback(
    (memberId: string) => {
      addMemberToCircle(memberId, circleId)
    },
    [circleId]
  )

  const handleRemoveMember = useCallback((memberId: string) => {
    setMemberId(memberId)
    onDeleteCircleMemberOpen()
  }, [])

  // CircleMemberDeleteModal
  const [memberId, setMemberId] = useState<string | undefined>()
  const {
    isOpen: isDeleteCircleMemberOpen,
    onOpen: onDeleteCircleMemberOpen,
    onClose: onDeleteCircleMemberClose,
  } = useDisclosure()

  // Go to member panel
  const navigateOrg = useNavigateOrg()
  const navigateToCircleMember = useCallback(
    (memberId: string) => {
      navigateOrg(`?circleId=${circleId}&memberId=${memberId}`)
    },
    [circleId]
  )

  return (
    <FormControl>
      <FormLabel>{role?.singleMember ? 'Occupé par :' : 'Membres :'}</FormLabel>
      {circle && membersIds && (
        <MembersSelect
          membersIds={membersIds}
          max={role?.singleMember ? 1 : undefined}
          onAdd={handleAddMember}
          onRemove={handleRemoveMember}
          onMemberClick={navigateToCircleMember}
        />
      )}

      {isDeleteCircleMemberOpen && memberId && (
        <CircleMemberDeleteModal
          memberId={memberId}
          circleId={circleId}
          isOpen
          onClose={onDeleteCircleMemberClose}
        />
      )}
    </FormControl>
  )
}
