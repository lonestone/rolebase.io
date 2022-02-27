import { addMemberToCircle } from '@api/entities/circles'
import { FormControl, FormLabel, useDisclosure } from '@chakra-ui/react'
import CircleMemberDeleteModal from '@components/organisms/modals/CircleMemberDeleteModal'
import useCircleAndParents from '@hooks/useCircleAndParents'
import useCreateLog from '@hooks/useCreateLog'
import { LogType } from '@shared/log'
import { useStoreState } from '@store/hooks'
import React, { useCallback, useMemo, useState } from 'react'
import MembersMultiSelect from './MembersMultiSelect'

interface Props {
  circleId: string
}

export default function CircleMemberFormControl({ circleId }: Props) {
  const createLog = useCreateLog()
  const circleAndParents = useCircleAndParents(circleId)
  const members = useStoreState((state) => state.members.entries)
  const circle = circleAndParents?.[circleAndParents.length - 1]
  const role = circle?.role

  const membersIds = useMemo(
    () => circle?.members.map((m) => m.memberId),
    [circle]
  )

  const handleAddMember = useCallback(
    async (memberId: string) => {
      if (!circle) return
      const changes = await addMemberToCircle(memberId, circleId)

      // Log change
      const member = members?.find((m) => m.id === memberId)
      if (member) {
        createLog({
          display: {
            type: LogType.CircleMemberAdd,
            id: circle.id,
            name: circle.role.name,
            memberId: member.id,
            memberName: member.name,
          },
          changes,
        })
      }
    },
    [circleId, circle]
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

  return (
    <FormControl>
      <FormLabel>
        {role?.singleMember ? 'Occupé par :' : 'Membres directs :'}
      </FormLabel>
      {circle && membersIds && (
        <MembersMultiSelect
          circleId={circleId}
          membersIds={membersIds}
          max={role?.singleMember ? 1 : undefined}
          onAdd={handleAddMember}
          onRemove={handleRemoveMember}
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
