import { addMemberToCircle } from '@api/entities/circles'
import { FormControl, FormLabel, useDisclosure } from '@chakra-ui/react'
import CircleMemberDeleteModal from '@components/organisms/circle/CircleMemberDeleteModal'
import useCircleAndParents from '@hooks/useCircleAndParents'
import useCreateLog from '@hooks/useCreateLog'
import { LogType } from '@shared/model/log'
import { MemberEntry } from '@shared/model/member'
import { useStoreState } from '@store/hooks'
import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import MembersMultiSelect from './MembersMultiSelect'

interface Props {
  circleId: string
}

export default function CircleMemberFormControl({ circleId }: Props) {
  const { t } = useTranslation()
  const createLog = useCreateLog()
  const circleAndParents = useCircleAndParents(circleId)
  const members = useStoreState((state) => state.members.entries)
  const circle = circleAndParents?.[circleAndParents.length - 1]
  const role = circle?.role

  const membersIds = useMemo(
    () =>
      // Retrieve members
      (
        circle?.members
          .map((cm) => members?.find((m) => m.id === cm.memberId))
          .filter(Boolean) as MemberEntry[] | undefined
      )
        // Sort by name
        ?.sort((a, b) => a.name.localeCompare(b.name))
        // Keep ids
        .map((m) => m.id),
    [circle, members]
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
    onDeleteOpen()
  }, [])

  // CircleMemberDeleteModal
  const [memberId, setMemberId] = useState<string | undefined>()
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure()

  return (
    <FormControl>
      <FormLabel>
        {role?.singleMember
          ? t('CircleMemberFormControl.labelSingleMember')
          : t('CircleMemberFormControl.labelMultiMembers')}
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

      {isDeleteOpen && memberId && (
        <CircleMemberDeleteModal
          memberId={memberId}
          circleId={circleId}
          isOpen
          onClose={onDeleteClose}
        />
      )}
    </FormControl>
  )
}
